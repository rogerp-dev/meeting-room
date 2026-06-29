# 🏢 Meeting Rooms — Painel de Operações

Sistema de gestão de tickets e manutenção de salas de reunião.  
Compartilhado em tempo real, com alertas automáticos e integração com Microsoft Teams.

---

## ✅ Funcionalidades

- 📋 Criação de tickets por analista (sala, ticket, responsável, tempo estimado)
- 🔄 Sincronização em tempo real entre todos os analistas via Firebase
- ⏱️ Contador regressivo de manutenção por sala
- 🔔 Alertas automáticos no navegador quando o prazo vencer
- 💬 Anotações por ticket com registro de analista e horário
- 📊 Métricas ao vivo (em manutenção, check pendente, atrasadas)
- 📣 Geração de mensagem formatada para colar no Microsoft Teams
- 🔐 Login seguro com conta Google (Firebase Auth)

---

## 📁 Estrutura de arquivos

```
meeting-rooms/
├── .github/workflows/pages.yml ← Deploy automático do GitHub Pages
├── index.html   ← Painel principal (toda a interface e lógica)
├── sw.js        ← Service Worker (alertas em background)
├── config.js    ← Configuração do Firebase (você preenche)
├── firestore.rules ← Regras de segurança do Firestore
└── README.md    ← Este guia
```

---

## 🚀 Como colocar no ar

### Passo 1 — Criar o projeto no Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **Adicionar projeto** → dê o nome `meeting-rooms-suporte`
3. Desative o Google Analytics (não é necessário) → **Criar projeto**

### Passo 2 — Ativar o Firestore

1. No menu lateral: **Build → Firestore Database**
2. Clique em **Criar banco de dados**
3. Selecione **Modo produção** → escolha a região `us-east1` → **Concluir**

### Passo 3 — Ativar o login com Google

1. No menu lateral: **Build → Authentication**
2. Clique em **Primeiros passos**
3. Aba **Sign-in method** → clique em **Google** → ative → **Salvar**

### Passo 4 — Copiar as chaves do Firebase

1. Clique na engrenagem ⚙️ → **Configurações do projeto**
2. Role até **Seus aplicativos** → clique em **</>** (Web)
3. Dê um nome (ex: `painel-salas`) → clique em **Registrar app**
4. Copie o objeto `firebaseConfig` exibido na tela

### Passo 5 — Preencher o config.js

Abra o arquivo `config.js` e substitua cada `"COLE_AQUI"` com os valores copiados:

```js
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSy...",
  authDomain:        "meeting-rooms-suporte.firebaseapp.com",
  projectId:         "meeting-rooms-suporte",
  storageBucket:     "meeting-rooms-suporte.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abc123"
};
```

### Passo 6 — Configurar as regras do Firestore

1. No Firebase Console → **Firestore Database** → aba **Regras**
2. Substitua o conteúdo pelo bloco abaixo, que também está no arquivo `firestore.rules`, e clique em **Publicar**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tickets/{id} {
      allow read, write: if request.auth != null;
    }
  }
}
```

> Isso garante que só analistas logados conseguem ver e editar os tickets.

### Passo 7 — Subir no GitHub Pages

1. Crie um repositório no GitHub (público ou privado)
2. Suba a pasta `files/` e a pasta `.github/` para o repositório
3. Vá em **Settings → Pages**
4. Em **Source**, selecione **GitHub Actions**
5. Faça um push na branch `main` ou rode o workflow **Deploy GitHub Pages** manualmente
6. Aguarde 1-2 minutos — o GitHub gera a URL pública:
   ```
   https://<seu-usuario>.github.io/<nome-do-repositorio>
   ```

### Passo 8 — Autorizar o domínio no Firebase

1. No Firebase Console → **Authentication** → aba **Settings**
2. Role até **Domínios autorizados** → clique em **Adicionar domínio**
3. Cole a URL do GitHub Pages (ex: `seu-usuario.github.io`)

> Sem isso, o login com Google será bloqueado.

---

## 🔔 Sistema de alertas

Os alertas funcionam diretamente no navegador, sem custo e sem servidor.

| Situação | Alerta |
|---|---|
| Prazo de manutenção venceu | Notificação do sistema + banner vermelho no painel |
| Faltam 10 minutos para vencer | Notificação de aviso |
| Check pendente não realizado | Notificação de atenção |

**Para ativar:** ao abrir o painel pela primeira vez, clique em **Ativar alertas** e permita notificações no navegador.

O Service Worker (`sw.js`) mantém o monitoramento ativo mesmo com a aba minimizada, enquanto o navegador estiver aberto.

---

## 📣 Integração com Microsoft Teams

O painel gera automaticamente uma mensagem formatada para o Teams a cada ticket.  
Basta clicar em **Copiar mensagem** no painel de detalhes e colar no canal de suporte.

Exemplo de mensagem gerada:

```
🔔 Atualização — Meeting Room

📍 Sala: Sala Brasília
🎫 Ticket: TK-00142
👤 Analista: Carlos Menezes
📊 Status: Em manutenção
⏱️ Prazo: 1h30m restantes
📝 Descrição: Troca de câmera e codec de vídeo

💬 Última nota: Equipamento retirado do estoque (Carlos · 14:32)
```

---

## 👥 Como os analistas usam o painel

```
1. Acessar a URL do GitHub Pages
2. Fazer login com a conta Google corporativa
3. Clicar em "Novo ticket" e preencher os dados da sala
4. Clicar em "Iniciar manutenção" → o contador começa
5. Adicionar anotações conforme o trabalho avança
6. Ao finalizar → clicar em "Reativar sala"
7. Copiar a mensagem e colar no canal do Teams
```

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Uso | Custo |
|---|---|---|
| GitHub Pages | Hospedagem do painel | Gratuito |
| Firebase Firestore | Banco de dados em tempo real | Gratuito (plano Spark) |
| Firebase Auth | Login com Google | Gratuito |
| Service Worker | Alertas em background | Gratuito (nativo do navegador) |
| Microsoft Teams | Canal de comunicação | Já contratado |

> ⚠️ O plano gratuito Firebase Spark suporta **50.000 leituras e 20.000 gravações por dia** —
> mais do que suficiente para 5 analistas com 148 salas.

---

## ❓ Dúvidas frequentes

**O painel funciona em celular?**  
Sim, o layout é responsivo e funciona em qualquer navegador moderno.

**Os dados somem se eu fechar o navegador?**  
Não. Tudo fica salvo no Firebase e sincronizado para todos os analistas.

**Um analista vê os tickets de outro?**  
Sim, todos os tickets são compartilhados entre os analistas logados.

**Os alertas funcionam com a aba fechada?**  
O Service Worker mantém o monitoramento com a aba minimizada, mas não com o navegador completamente fechado.

---

## 📞 Suporte

Em caso de dúvidas na configuração, consulte:
- [Documentação do Firebase](https://firebase.google.com/docs)
- [GitHub Pages — Primeiros passos](https://docs.github.com/pt/pages)
