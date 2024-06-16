```
# Générer la clé privée
openssl genpkey -algorithm RSA -out private.key -aes256
# Générer la clé publique
openssl rsa -pubout -in private.key -out public.key
```