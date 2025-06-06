type PesquisaPayload = Record<string, any>;

export async function postPesquisaCompleta(values: PesquisaPayload){
    try{
        const base = process.env.NEXT_PUBLIC_API_BASE_URL;

        const baseUrl = base || '/api';

        const endpoint = `${baseUrl}/pesquisa-completa/`;

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(values)
        });

        if(!res.ok){
            const errorJson = await res.json().catch(() => ({}));
            throw new Error(
                `Erro ${res.status}: ${
                    errorJson.detail || JSON.stringify(errorJson) || res.statusText
                }`
            );
        }
        return await res.json();

    }catch(err){
        console.error('postPesquisaCompleta error: ', err);
        throw err;
    }
}