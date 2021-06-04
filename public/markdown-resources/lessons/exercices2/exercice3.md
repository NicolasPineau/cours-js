## Exercice 21 : Complétez le store

Complétez le code ci-dessous pour qu'il crée une nouvelle version de l'objet `messageStore` qui stockera
les données de `newMessage` en plus de ce qu'il contient déjà.

---

```javascript_exercise21

const messageStore = {
    messageById: {
        15: {
            date: '22/06/2021 10:30',
            text: 'Bonjour à tous',
            recipients: [100, 105, 120],
        },
        19: {
            date: '23/06/2021 14:00',
            text: 'Les vacances sont proches',
            recipients: [105, 122, 133],
        },
        28: {
             date: '23/06/2021 14:00',
             text: 'Les vacances sont proches',
             recipients: [100, 105, 133],
        },
    },
    messageIdByRecipientId: {
        100: [15, 28],
        105: [15, 19, 28],
        120: [15],
        122: [19],
        133: [19,28],
    },
};

const newMessage = { id: 31, recipients: [105, 133, 141] };

const newMessageStore = {
    ...messageStore,
    messageById: /** ??? **/,
    messageIdByRecipientId: /** ??? **/,
}:

```
