const {Router} = require('express');
const {banner} = require('../controllers/bannerController');
const multer = require('../midlewares/multer');
const {authenticate} = require('../midlewares/sign_ver_jwt_token')

const router = Router();

router.get('/', banner.getBanners);

router.post('/', authenticate, multer.single('avatar'), banner.createBanner);

router.put('/:id', authenticate, multer.single('avatar'), banner.putBanner);

router.patch('/:id', authenticate, banner.patchBanner);

router.delete('/:id', authenticate, banner.deleteBanner);

module.exports = router;