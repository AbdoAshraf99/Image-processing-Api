// image resizer function
import { Response, Request } from 'express';
import path from 'path';
import sharp from 'sharp';

const imageResizer = (req: Request, res: Response) => {
    const fname: unknown = req.query.fname;
    const width: unknown = req.query.width;
    const height: unknown = req.query.height;
    if (fname == null) {
        //check if file name not empty
        return res.send('Error: input file is missing');
    } else if (width == null || height == null) {
        //check if width or height not empty
        return res.send('height or width not entered');
    } else if (Number(height) <= 0 || Number(width) <= 0) {
        //check if width and height are valide
        return res.send('height and width must be more than 0');
    } else {
        try {
            //used sharp to resize Image and store it in thumb folder
            sharp(path.resolve('assets/full/' + fname + '.jpg'))
                .resize({ height: Number(height), width: Number(width) })
                .toFile(path.resolve('assets/thumb/' + fname + '_thumb.jpg'))
                .then(() => {
                    return res.sendFile(
                        path.resolve('assets/thumb/' + fname + '_thumb.jpg')
                    );
                });
        } catch (e) {
            console.error(e);
            return res.send(e);
        }
    }
};
export default imageResizer;
