import { Request } from "express";

export default interface RetrieveTokenFromRequest {
    retrieve(request: Request): string;
}