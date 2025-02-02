const { Banner } = require('../models/');
const fs = require('fs');
const path = require('path');

module.exports.getBanners = async (req, res) => {
    try {
        const banners = await Banner.findAll();
        res.status(200).json(banners);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports.createBanner = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ err: 'No file provided' });
        }

        const { link, fileName } = req.body;
        const newBanner = await Banner.create({
            bannerLink: link,
            bannerName: fileName,
        });

        res.status(200).json(newBanner);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports.putBanner = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ err: 'No file provided' });
        }

        const { id } = req.params;
        const { link, fileName } = req.body;

        const bannerUpdate = await Banner.findByPk(id);
        if (!bannerUpdate) {
            return res.status(404).json({ err: 'Banner not found' });
        }

        bannerUpdate.bannerLink = link;
        bannerUpdate.bannerFilename = fileName;
        await bannerUpdate.save();

        res.status(200).json(bannerUpdate);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports.patchBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const { link } = req.body;

        const bannerUpdate = await Banner.findByPk(id);
        if (!bannerUpdate) {
            return res.status(404).json({ err: 'Banner not found' });
        }

        bannerUpdate.bannerLink = link;
        await bannerUpdate.save();

        res.status(200).json(bannerUpdate);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

module.exports.deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;

        const bannerDelete = await Banner.findByPk(id);
        if (!bannerDelete) {
            return res.status(404).json({ err: 'Banner not found' });
        }

        const filePath = path.join(__dirname, `../images/${bannerDelete.bannerFileName}`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await bannerDelete.destroy();

        res.status(200).json({ message: 'Banner Deleted', banner: bannerDelete });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};
