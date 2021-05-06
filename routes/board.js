const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const util = require("../util");

const {Post, User, Hashtag} = require('../models');
const {isLoggedIn} = require("./middlewares");

const router = express.Router();

try {
    fs.readdirSync('uploads');
}catch (error){
    console.error('uploads 폴더가 없어 생성합니다');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

//이미지
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
});

//리스트 - 댓글, 제목, 내용 첫줄, 댓글, 스크랩 수정, 삭제
router.get('/write', isLoggedIn, async (req, res) => {
    try {
        let list = await Post.findAll({
            // order: [['created_at, DESC']],
        });
        // return res.render("board", {
        //     posts: list
        // });
        return res.json({
            list,
        });
    } catch (error) {
        console.log('query is not executed. select fail...\n' + error);
    }
});

const upload2 = multer();

//글작성
router.post('/write', isLoggedIn, upload2.none(), async (req, res) => {
    try {
        let board = await Post.create({
            title: req.body.title,
            content: req.body.content,
            img: req.body.url,
        });
        return res.json({
            board,
        });
    } catch (error) {
        console.log('query is not executed. insert fail...\n' + error);
    }
});

//글 수정
router.get('/edit', isLoggedIn, function (req, res) {
    let postID = req.params.id;
    try {
        let result = Post.findOne({
            where: {id: postID}
        });
        // return res.render("edit", {
        //     post: result
        // });
    } catch (error) {
        console.log('query is not executed. select fail...\n' + error);
    }
});

//글 수정시 db update
router.put('/edit/:id', isLoggedIn, function (req, res) {
    if(req.params.id !== req.user.id) return res.json({success:false, message:"삭제 권한이 없습니다."})
    let postID = req.params.id;
    let body = req.body;

    Post.update({
        title: body.editTitle,
        content: body.editContent
    }, {
        where: {id: postID}
    })
        .then(result => {
            console.log("데이터 수정 완료");
            res.redirect("/");
        })
        .catch(err => {
            console.log("데이터 수정 실패");
        });
});

//글 삭제시 db destroy
router.delete('/delete/:id', isLoggedIn, function(req, res, next) {
    if(req.params.id !== req.user.id) return res.json({success:false, message:"삭제 권한이 없습니다."})
    let postID = req.params.id;

    try {
        let result = Post.destroy({
            where: {id: postID}
        })
        // return res.redirect("/")
    } catch(error) {
        console.log('query is not executed. select fail...\n' + error);
    }
});
module.exports = router;
