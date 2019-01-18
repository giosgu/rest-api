export abstract class AbstractController {
    public abstract get(req: Request, res: Response):Request;
    public abstract post(req: Request, res: Response):Request;

}