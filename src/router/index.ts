import { Router , Request , Response } from 'express';
import jwt from 'jsonwebtoken';
import  { check, body, validationResult } from 'express-validator';
import Comment from '../entity/Comment';

const HASH_API = 'c0cd1ad911f5244fa9a184eda68269c7bb4292e8';

const router = Router();


const verifyAndDecode = async (token : string) => {
    // @ts-ignore
    try {
        const decoded = await jwt.verify(token , HASH_API);
        // @ts-ignore
        return decoded.id;
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
        return null;
    }
}

const bodyValidator = [
    check('token').exists(),
    body('text')
        .not().isEmpty()
        .trim()
        .escape()
]


router.get('/' , async (_ : Request,res : Response) => {
    try {
        res.render('pages/index');
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        res.send("Error");
    }
});

router.post('/get-token-for-slug',async (req : Request,res : Response) => {
    try {
        const { slug } = req.body;
        // tslint:disable-next-line:no-console
        const token = await jwt.sign({ id: slug }, HASH_API);
        res.json({ token });
    } catch (error : any) {
        // tslint:disable-next-line:no-console
        console.log(error);
        res.json({
            error : 'something went wrong',
        });
    }
});


router.get('/get/:token',async (req : Request,res : Response) => {
   try {
       const token = req.params.token;
       // tslint:disable-next-line:no-console
       const slug = await verifyAndDecode(token);

       if(!slug) throw new Error("token is not verified");

       // tslint:disable-next-line:no-console
       console.log(slug);

       const comments = await Comment.createQueryBuilder('comment')
           .select(["comment.id","comment.parentId","comment.text"])
           .where("comment.slug = :slug" , { slug })
           .getMany();
       // tslint:disable-next-line:no-console
        console.log(comments);
       res.json({ data : comments });
   } catch (error : any) {
       // tslint:disable-next-line:no-console
       console.log(error);
       res.json({
           error : 'something went wrong',
       });
   }
});

router.post('/create', bodyValidator ,async (req : Request,res : Response) => {
    try {
        validationResult(req).throw();

        const { token, text, parentId } = req.body;
        // tslint:disable-next-line:no-console
        const slug = await verifyAndDecode(token);
        if(!slug) throw new Error("token is not verified");
        const comment = await Comment.create({
            slug,
            text,
            parentId
        }).save();

        // tslint:disable-next-line:no-console
        console.log(comment);

        res.json({ data : comment });
    } catch (error : any) {
        // tslint:disable-next-line:no-console
        console.log(error);
        res.json({
            error : 'something went wrong',
        });
    }
});



//
// router.post('/update',async (req : Request,res : Response) => {
//     const { token, text } = req.body;
//     // tslint:disable-next-line:no-console
//     console.log(token,text);
//     res.json({ token , text });
// });
//
// router.post('/update',async (req : Request,res : Response) => {
//     const { token, text } = req.body;
//     // tslint:disable-next-line:no-console
//     console.log(token,text);
//     res.json({ token , text });
// });

export default router;
