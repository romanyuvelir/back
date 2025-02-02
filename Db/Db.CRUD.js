const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize');

const Deal = sequelize.define('Deal', {
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

Deal.createDeal = (newDeal) => {
    try {
        const deal = Deal.create(newDeal);
        console.log("Deal created:", deal);
        return deal;
    } catch(err) {
        console.err('Error creating deal:', err);
        throw err;
    }
};

Deal.findById = (dealId) => {
    try {
        const deal = Deal.findByPk(dealId);
        if(!deal) {
            throw {kind: 'not_found'};
        }
        console.log('Deal found:', deal);
        return deal;
    } catch(err) {
        console.err('Error finding deal:', err);
        throw err;
    }
};

Deal.getAllDeals = () => {
    try {
        const deals = Deal.findAll();
        console.log('All deals:', deals);
        return deals;
    } catch(err) {
        console.err('Error getting deals:', err);
        throw err;
    }
};

Deal.updateDealById = (id, deal) => {
    try {
        const [affectedRows] = Deal.update(deal, {where: {id}});
        if(affectedRows === 0) {
            throw {kind: 'not_found'};
        }
        console.log('Deal updated:', {id, ...deal});
        return{id, ...deal};
    } catch(err) {
        console.err('Error updating deal:', err);
         throw err;
    }
};

Deal.deleteDealById = (id) => {
    try {
        const affectedRows = Deal.destroy({where: {id}});
        if(affectedRows === 0) {
            throw{kind: 'not_found'};
        }
        console.log('Deal deleted:', id);
    } catch(err) {
        console.err('Error deleting deal:', err);
        throw err;
    }
};

Deal.dealeteAllDeals = () => {
    try {
        const affectedRows = Deal.destroy({where: {}});
        console.log('All deals deleted:', affectedRows);
    } catch(err) {
        console.err('Error deleting all deals:', err);
        throw err;
    }
};

module.exports = Deal;