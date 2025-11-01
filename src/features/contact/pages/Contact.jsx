// 1. src/features/contact/pages/Contact.jsx
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { contactService } from '../services/contactService';
import Toast from '../components/Toast';

const Contact = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [validation, setValidation] = useState({
        name: { checking: false, valid: null, message: '' },
        email: { checking: false, valid: null, message: '' }
    });

    const [suggestions, setSuggestions] = useState({
        name: null,
        email: null
    });

    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);

    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const savedHistory = localStorage.getItem('contactHistory');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Validación de nombre en tiempo real
    useEffect(() => {
        if (formData.name.length >= 2) {
            const timeoutId = setTimeout(async () => {
                setValidation(prev => ({
                    ...prev,
                    name: { checking: true, valid: null, message: 'Verificando nombre...' }
                }));

                // Solo validar contra el usuario logueado
                const result = await contactService.validateName(formData.name, user);

                // Si hay coincidencia parcial, guardar sugerencia
                if (result.suggestion && result.suggestion !== formData.name) {
                    setSuggestions(prev => ({ ...prev, name: result.suggestion }));
                } else {
                    setSuggestions(prev => ({ ...prev, name: null }));
                }

                setValidation(prev => ({
                    ...prev,
                    name: {
                        checking: false,
                        valid: result.exists,
                        message: result.exists
                            ? `✓ Nombre correcto: ${result.user.name}`
                            : `✗ El nombre debe ser: ${user?.name || 'tu nombre registrado'}`
                    }
                }));
            }, 500);

            return () => clearTimeout(timeoutId);
        } else {
            setValidation(prev => ({
                ...prev,
                name: { checking: false, valid: null, message: '' }
            }));
            setSuggestions(prev => ({ ...prev, name: null }));
        }
    }, [formData.name, user]);

    // Validación de email en tiempo real
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (formData.email && emailRegex.test(formData.email)) {
            const timeoutId = setTimeout(async () => {
                setValidation(prev => ({
                    ...prev,
                    email: { checking: true, valid: null, message: 'Verificando email...' }
                }));

                // Solo validar contra el usuario logueado
                const result = await contactService.validateEmail(formData.email, user);

                setValidation(prev => ({
                    ...prev,
                    email: {
                        checking: false,
                        valid: result.exists,
                        message: result.exists
                            ? `✓ Email correcto`
                            : `✗ El email debe ser: ${user?.email || 'tu email registrado'}`
                    }
                }));
            }, 500);

            return () => clearTimeout(timeoutId);
        } else if (formData.email.length >= 2) {
            // Buscar sugerencia de email
            const emailSuggestion = contactService.getEmailSuggestion(formData.email, user);
            if (emailSuggestion && emailSuggestion !== formData.email) {
                setSuggestions(prev => ({ ...prev, email: emailSuggestion }));
            } else {
                setSuggestions(prev => ({ ...prev, email: null }));
            }

            if (formData.email) {
                setValidation(prev => ({
                    ...prev,
                    email: {
                        checking: false,
                        valid: false,
                        message: '✗ Formato de email inválido'
                    }
                }));
            }
        } else {
            setValidation(prev => ({
                ...prev,
                email: { checking: false, valid: null, message: '' }
            }));
            setSuggestions(prev => ({ ...prev, email: null }));
        }
    }, [formData.email, user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleKeyDown = (e, field) => {
        // Autocompletar con TAB
        if (e.key === 'Tab' && suggestions[field]) {
            e.preventDefault();
            setFormData(prev => ({
                ...prev,
                [field]: suggestions[field]
            }));
            setSuggestions(prev => ({ ...prev, [field]: null }));
        }
    };

    const handleSuggestionClick = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        setSuggestions(prev => ({ ...prev, [field]: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setToast({ type: 'warning', message: 'Por favor completa todos los campos' });
            return;
        }

        if (!validation.name.valid || !validation.email.valid) {
            setToast({
                type: 'error',
                message: 'El nombre y email deben coincidir con tu cuenta'
            });
            return;
        }

        setSubmitting(true);
        setToast({ type: 'info', message: 'Enviando formulario...' });

        try {
            const result = await contactService.submitContact({
                ...formData,
                userId: user?.id
            });

            if (result.success) {
                setToast({
                    type: 'success',
                    message: `✅ ${result.message}. ID: ${result.data.id}`
                });

                const newEntry = {
                    ...formData,
                    timestamp: new Date().toISOString(),
                    id: result.data.id
                };
                const updatedHistory = [newEntry, ...history].slice(0, 10);
                setHistory(updatedHistory);
                localStorage.setItem('contactHistory', JSON.stringify(updatedHistory));

                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                let errorMessage = result.message;

                if (result.error === 'CONNECTION_ERROR') {
                    errorMessage = '🔌 Error de conexión: No se pudo conectar con el servidor';
                } else if (result.error === 'SERVICE_UNAVAILABLE') {
                    errorMessage = '🚧 Servicio no disponible: Intenta más tarde';
                }

                setToast({ type: 'error', message: errorMessage });
            }
        } catch (error) {
            setToast({
                type: 'error',
                message: '❌ Error inesperado: ' + error.message
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[#5C2D0A] via-[#92400E] to-[#C2410C] py-12 px-4 relative overflow-hidden">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-[#FED7AA]/30 rounded-full blur-3xl -top-40 -left-40 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-[#F4C4A4]/30 rounded-full blur-3xl -bottom-48 -right-1/4 animate-pulse" style={{ animationDelay: '0.7s' }}></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-10 animate-fadeIn">
                    <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#FED7AA] via-[#F4C4A4] to-[#B45309] rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                            <span className="text-4xl">📧</span>
                        </div>
                    </div>
                    <h1 className="text-5xl font-extrabold text-[#FFF7ED] mb-3 font-poppins">Formulario de Contacto</h1>
                    <p className="text-[#F4C4A4] text-lg">
                        Hola <span className="text-[#FED7AA] font-semibold">{user?.name}</span>, envíanos tu mensaje
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Formulario */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#292524]/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-[#FED7AA]/30 animate-slideInLeft">
                            {/* Info del usuario logueado */}
                            <div className="bg-[#FED7AA]/10 border border-[#B45309]/30 rounded-xl p-4 mb-6">
                                <p className="text-[#B45309] text-xs mt-2">
                                    💡 Tip: Usa TAB para autocompletar cuando veas una sugerencia
                                </p>
                            </div>
                            <div className="space-y-6">
                                {/* Campo Nombre */}
                                <div className="group">
                                    <label className="block text-sm font-medium text-[#F4C4A4] mb-2">
                                        Nombre Completo *
                                    </label>
                                    <div className="relative">
                                        <input
                                            ref={nameInputRef}
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onKeyDown={(e) => handleKeyDown(e, 'name')}
                                            className="w-full px-4 py-3 bg-[#FED7AA]/10 border border-[#FED7AA]/30 rounded-xl focus:ring-2 focus:ring-[#FED7AA] outline-none text-[#FFF7ED] placeholder-[#B45309] transition-all duration-300 pr-10"
                                            placeholder="Escribe tu nombre..."
                                            required
                                            autoComplete="off"
                                        />
                                        {validation.name.checking && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <div className="w-5 h-5 border-2 border-[#FED7AA] border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                        {!validation.name.checking && validation.name.valid !== null && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                {validation.name.valid ? (
                                                    <span className="text-green-400 text-xl">✓</span>
                                                ) : (
                                                    <span className="text-red-400 text-xl">✗</span>
                                                )}
                                            </div>
                                        )}

                                        {/* Sugerencia de autocompletado */}
                                        {suggestions.name && (
                                            <div className="absolute left-0 right-0 top-full mt-2 z-10">
                                                <button
                                                    type="button"
                                                    onClick={() => handleSuggestionClick('name', suggestions.name)}
                                                    className="w-full bg-[#FED7AA]/20 hover:bg-[#FED7AA]/30 border border-[#B45309]/40 rounded-lg px-4 py-2 text-left transition-all duration-200"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[#FFF7ED] font-medium">{suggestions.name}</span>
                                                        <span className="text-[#F4C4A4] text-xs bg-[#B45309]/30 px-2 py-1 rounded">
                                                            TAB ⇥
                                                        </span>
                                                    </div>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    {validation.name.message && (
                                        <p className={`mt-2 text-sm ${validation.name.valid
                                                ? 'text-green-400'
                                                : validation.name.checking
                                                    ? 'text-[#F4C4A4]'
                                                    : 'text-red-400'
                                            }`}>
                                            {validation.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Campo Email */}
                                <div className="group">
                                    <label className="block text-sm font-medium text-[#F4C4A4] mb-2">
                                        Correo Electrónico *
                                    </label>
                                    <div className="relative">
                                        <input
                                            ref={emailInputRef}
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onKeyDown={(e) => handleKeyDown(e, 'email')}
                                            className="w-full px-4 py-3 bg-[#FED7AA]/10 border border-[#FED7AA]/30 rounded-xl focus:ring-2 focus:ring-[#FED7AA] outline-none text-[#FFF7ED] placeholder-[#B45309] transition-all duration-300 pr-10"
                                            placeholder="tu@email.com"
                                            required
                                            autoComplete="off"
                                        />
                                        {validation.email.checking && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <div className="w-5 h-5 border-2 border-[#FED7AA] border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                        {!validation.email.checking && validation.email.valid !== null && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                {validation.email.valid ? (
                                                    <span className="text-green-400 text-xl">✓</span>
                                                ) : (
                                                    <span className="text-red-400 text-xl">✗</span>
                                                )}
                                            </div>
                                        )}

                                        {/* Sugerencia de autocompletado */}
                                        {suggestions.email && (
                                            <div className="absolute left-0 right-0 top-full mt-2 z-10">
                                                <button
                                                    type="button"
                                                    onClick={() => handleSuggestionClick('email', suggestions.email)}
                                                    className="w-full bg-[#FED7AA]/20 hover:bg-[#FED7AA]/30 border border-[#B45309]/40 rounded-lg px-4 py-2 text-left transition-all duration-200"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[#FFF7ED] font-medium">{suggestions.email}</span>
                                                        <span className="text-[#F4C4A4] text-xs bg-[#B45309]/30 px-2 py-1 rounded">
                                                            TAB ⇥
                                                        </span>
                                                    </div>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    {validation.email.message && (
                                        <p className={`mt-2 text-sm ${validation.email.valid
                                                ? 'text-green-400'
                                                : validation.email.checking
                                                    ? 'text-[#F4C4A4]'
                                                    : 'text-red-400'
                                            }`}>
                                            {validation.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Campo Asunto */}
                                <div className="group">
                                    <label className="block text-sm font-medium text-[#F4C4A4] mb-2">
                                        Asunto *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#FED7AA]/10 border border-[#FED7AA]/30 rounded-xl focus:ring-2 focus:ring-[#FED7AA] outline-none text-[#FFF7ED] placeholder-[#B45309] transition-all duration-300"
                                        placeholder="Motivo de tu mensaje"
                                        required
                                    />
                                </div>

                                {/* Campo Mensaje */}
                                <div className="group">
                                    <label className="block text-sm font-medium text-[#F4C4A4] mb-2">
                                        Mensaje *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="6"
                                        className="w-full px-4 py-3 bg-[#FED7AA]/10 border border-[#FED7AA]/30 rounded-xl focus:ring-2 focus:ring-[#FED7AA] outline-none text-[#FFF7ED] placeholder-[#B45309] transition-all duration-300 resize-none"
                                        placeholder="Escribe tu mensaje aquí..."
                                        required
                                    ></textarea>
                                </div>

                                {/* Botón Submit */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting || !validation.name.valid || !validation.email.valid}
                                    className="w-full bg-gradient-to-r from-[#FED7AA] via-[#F4C4A4] to-[#B45309] hover:from-[#F4C4A4] hover:via-[#B45309] hover:to-[#C2410C] text-[#92400E] font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {submitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Enviando mensaje...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            Enviar Mensaje
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* Historial */}
                        <div className="bg-[#292524]/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-[#FED7AA]/30 animate-slideInRight" style={{ animationDelay: '0.2s' }}>
                            <h3 className="text-xl font-bold text-[#FED7AA] mb-4 flex items-center">
                                <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Historial ({history.length})
                            </h3>
                            <div className="space-y-2 max-h-80 overflow-y-auto">
                                {history.length === 0 ? (
                                    <p className="text-[#F4C4A4] text-sm text-center py-4">
                                        No hay mensajes enviados aún
                                    </p>
                                ) : (
                                    history.map((item, idx) => (
                                        <div key={idx} className="bg-[#FED7AA]/10 p-3 rounded-lg border border-[#B45309]/20 hover:bg-[#FED7AA]/15 transition-all duration-200">
                                            <p className="text-[#FFF7ED] font-medium text-sm">{item.subject}</p>
                                            <p className="text-[#F4C4A4] text-xs mt-1">
                                                {new Date(item.timestamp).toLocaleString('es-ES', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
      `}</style>
        </div>
    );
};

export default Contact;