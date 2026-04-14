interface User {
    id: number;
    name: string;
    role: "admin" | "user";
}

abstract class ApiClient<T> {
    protected baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async fetchAll<T>(): Promise<T[]> {
        const response = await fetch(this.baseUrl);
        return response.json();
    }
}

type userUpdate = Partial<User>;
type userProfile = Pick<User, "name" | "role">;

function isUser(obj: any): obj is User {
    return "name" in obj && "role" in obj;
}

function userReducer(state: User[], action: any) {
    switch (action.type) {
        case "ADD_USER":
            return [...state, action.payload];
        case "UPDATE_USER":
            return state.map((user) =>
                user.id === action.payload.id ? action.payload : user
            );
        case "DELETE_USER":
            return state.filter((user) => user.id !== action.payload.id);
        default:
            return state;
    }
}