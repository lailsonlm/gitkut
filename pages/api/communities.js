import { SiteClient } from 'datocms-client'

export default async function receiverOfRequests(req, res) {

    if(req.method == 'POST') {
        const TOKEN = 'a1d00d4c3da7487c3701bd9fe23b86'
        const client = new SiteClient(TOKEN);
    
        const communityCreated = await client.items.create({
            itemType: "975354",
            ...req.body,
            // title: "Comunidade teste",
            // imageUrl: "https://images.unsplash.com/photo-1489533119213-66a5cd877091?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
            // creatorSlug: "lailsonlm"
        })
    
        res.json({
            data: "Dados gerados",
            communityCreated: communityCreated,
        })

        return;
    }

    res.status(404).json({
        message: 'Ainda não temos ação para o GET'
    })
}