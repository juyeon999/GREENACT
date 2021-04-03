const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');
const {isLoggedIn} = require("./middlewares");

const router = express.Router();

//리스트 - 댓글, 제목, 내용 첫줄, 댓글, 스크랩 수정, 삭제
router.get('/write', isLoggedIn, async (req, res) => {
    try {
        let list = await Post.findAll({});
        return res.render("board", {
            posts: list
        });
        // return res.json({
        //     list,
        // })
    } catch (error) {
        console.log('query is not executed. select fail...\n' + error);
    }
});

//글작성
router.post('/write', isLoggedIn, async (req, res) => {
    const {title, content, img} = req.body;
    try {
        let board = await Post.create({
            title: req.body.title,
            content: req.body.content,
            img: req.body.img,
        });
        return res.json({
            board,
        });
    } catch (error) {
        console.log('query is not executed. insert fail...\n' + error);
    }
});

//글 수정
router.get('/edit', isLoggedIn, function (req, res, next) {
    let postID = req.params.id;
    try {
        let result = Post.findOne({
            where: {id: postID}
        });
        return res.render("edit", {
            post: result
        });
    } catch (error) {
        console.log('query is not executed. select fail...\n' + error);
    }
});

//글 수정시 db update
router.put('/edit/:id', isLoggedIn, function (req, res, next) {
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
            //res.redirect("/board");
        })
        .catch(err => {
            console.log("데이터 수정 실패");
        });
});

//글 삭제시 db destroy
router.delete('/delete/:id', isLoggedIn, function(req, res, next) {
    let postID = req.params.id;

    try {
        let result = Post.destroy({
            where: {id: postID}
        })
        return res.redirect("/")
    } catch(error) {
        console.log('query is not executed. select fail...\n' + error);
    }
});
module.exports = router;