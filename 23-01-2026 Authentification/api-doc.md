## GET {{baseUrl}}/users
📥 Récupère tous les users

**Params:**
- page: numéro (défaut: 1)
- limit: nombre (défaut: 10)

**Response:**
{
  "users": [...],
  "total": 50
}

## POST {{baseUrl}}/users
Crée un user

**Body:**
{
  "name": "John",
  "email": "john@test.com"
}