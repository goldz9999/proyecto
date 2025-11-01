export const contactService = {
    // Validar nombre solo contra el usuario logueado
    validateName: async (name, currentUser) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!currentUser) {
            return { exists: false, user: null, suggestion: null };
        }

        const normalizedInput = name.toLowerCase().trim();
        const normalizedUserName = currentUser.name.toLowerCase();

        // Verificar coincidencia exacta
        if (normalizedInput === normalizedUserName) {
            return {
                exists: true,
                user: currentUser,
                suggestion: null
            };
        }

        // Verificar coincidencia parcial para sugerencia
        if (normalizedUserName.startsWith(normalizedInput) && normalizedInput.length >= 2) {
            return {
                exists: false,
                user: null,
                suggestion: currentUser.name
            };
        }

        return {
            exists: false,
            user: null,
            suggestion: null
        };
    },

    // Validar email solo contra el usuario logueado
    validateEmail: async (email, currentUser) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!currentUser) {
            return { exists: false, user: null };
        }

        const normalizedInput = email.toLowerCase().trim();
        const normalizedUserEmail = currentUser.email.toLowerCase();

        if (normalizedInput === normalizedUserEmail) {
            return {
                exists: true,
                user: currentUser
            };
        }

        return {
            exists: false,
            user: null
        };
    },

    // Obtener sugerencia de email
    getEmailSuggestion: (partialEmail, currentUser) => {
        if (!currentUser) return null;

        const normalizedInput = partialEmail.toLowerCase().trim();
        const normalizedUserEmail = currentUser.email.toLowerCase();

        if (normalizedUserEmail.startsWith(normalizedInput) && normalizedInput.length >= 2) {
            return currentUser.email;
        }

        return null;
    },

    // Enviar formulario de contacto
    submitContact: async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulación de diferentes respuestas (80% éxito, 20% error)
        const random = Math.random();

        if (random < 0.8) {
            return {
                success: true,
                status: 200,
                message: 'Formulario enviado correctamente',
                data: { id: Date.now(), ...data }
            };
        } else if (random < 0.9) {
            return {
                success: false,
                status: 500,
                message: 'Error de conexión con el servidor',
                error: 'CONNECTION_ERROR'
            };
        } else {
            return {
                success: false,
                status: 503,
                message: 'Servicio temporalmente no disponible',
                error: 'SERVICE_UNAVAILABLE'
            };
        }
    }
};
