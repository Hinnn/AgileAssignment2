let datastore = require('../../models/customers');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
let mongoose = require('mongoose');

let mongodbUri ='mongodb://YueWang:bookings999@ds135179.mlab.com:35179/bookings';

chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash');
let customer =[
    {     "customerID": 1000202,
        "name": "Yvette",
        "email": "Yvette@wit.ie",
        "password": "21323"
    },

    {
        "customerID": 10000323,
        "name": "Shaw",
        "email": "shaw@gmail.com",
        "password": "shaw123"
    },
    {
        "customerID": 10009340,
        "name": "Yue",
        "email": "yue@gmail.com",
        "password": "yue123"
    }
]
let db = mongoose.connection;

describe('Customers', () => {
    before(function (done) {

        mongoose.connect(mongodbUri, {useNewUrlParser: true}, function (err) {
            if (err)
                console.log('Connection Error:' + err);
            else
                console.log('Connection successful!');
        });
        try {
            db.collection("customersdb").insertMany(customer);
        } catch (e) {
            print(e);
        }
        done();

    });
    after(function (done) {

        db.collection("customersdb").remove({'customerID': {$in: [1000202, 10000323, 10009340, 21000000]}});
        done();
    });
    describe('POST /customers', function () {
        it('should return confirmation message and add a customer', function (done) {
            let customer = {
                "customerID": 21000000,
                "name": "Angle",
                "email": "angle@163.com",
                "password": "angle123"
            };
            chai.request(server)
                .post('/customers')
                .send(customer)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('message').equal('Sign up Successfully!');
                    done();

                });
        });
        after(function (done) {
            chai.request(server)
                .get('/customers')
                .end(function (err, res) {
                    let result = _.map(res.body, (customer) => {
                        return {
                            customerID: customer.customerID,
                            name: customer.name,
                            email: customer.email,
                            password: customer.password
                        };
                    });
                    expect(result).to.include({
                        "customerID": 21000000,
                        "name": "Angle",
                        "email": "angle@163.com",
                        "password": "angle123"
                    });
                    done();
                });
        });
    });
});
