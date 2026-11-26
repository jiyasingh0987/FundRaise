
erDiagram
    USER ||--o{ CAMPAIGN : creates
    USER ||--o{ PLEDGE : makes
    CAMPAIGN ||--o{ PLEDGE : receives

    USER {
        ObjectId _id PK
        string name
        string email UK
        string password
        string role
    }

    CAMPAIGN {
        ObjectId _id PK
        string title
        string description
        number goal
        number raisedAmount
        string category
        date deadline
        string status
        ObjectId creator FK
    }

    PLEDGE {
        ObjectId _id PK
        number amount
        ObjectId supporter FK
        ObjectId campaign FK
        string status
    }
