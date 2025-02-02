const { response } = require('express');
const {Banner} = require('../models/BannerModel');
const fs = require('fs');
const path = require('path');

module.exports.getBanners = (req, res) => {
    try {
        const banners = Banner.findAll();
        response.status(200).json(banners);
    } catch(err){
        response.status(500).json({err: err.message});
    }
}

module.exports.createBanner = (req, res) => {
    try {
        if(req.file) {
            const {link,fileName} = req.body;

            const newBanner = Banner.create({
                bannerLink: link,
                bannerName: fileName,
            });

            res.status(200).json(newBanner);
        }
        else {
            res.status(400).json({err:'No file provided'})
        }
    } catch(err) {
        res.status(500).json({err: err.message});
    }
}

module.exports.putBanner = (req, res) => {
    try {
        if (req.file) {
            const {id} = req.params;
            const {link, fileName} = req.body;

            const bannerUpdate = Banner.findByPk(id);
            if (!bannerUpdate) {
                return res.status(404).json({err: 'Banner not found'});
            }
            
            bannerUpdate.bannerLink = link;
            bannerUpdate.bannerFilename = fileName;
            bannerUpdate.save();

            res.status(200).json(bannerUpdate);
        } else {
            res.status(400).json({err: 'No file provided'})
        }
    } catch (err) {
        res.status(500).json({err: err.message});
    }
}

module.exports.patchBanner = (req, res) => {
    try {
        const {id} = req.params;
        const {link} = req.body;

        const bannerUpdate = Banner.findByPk(id);
        if (!bannerUpdate) {
            return res.status(400).json({err: 'Banner not found'});
        }

        bannerUpdate.bannerLink = link;
        bannerUpdate.save();

        res.status(200).json(bannerUpdate);
    } catch(err) {
        res.status(500).json({err: err.message});
    }
}

module.exports.deleteBanner = (req, res) => {
    try {
        const {id} = req.params;

        const bannerDelete = Banner.findByPk(id);
        if(!bannerDelete) {
            return res.status(404).json({err: 'Banner not found'});
        }

        const filePath = path.json(__dirname, '../images/${bannerDelete.bannerFileName');
        if(fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        bannerDelete.destroy();

        res.status(200).json({message: 'Banner Deleted', banner: bannerDelete});
    } catch(err) {
        res.status(500).json({err: err.message});
    }
}