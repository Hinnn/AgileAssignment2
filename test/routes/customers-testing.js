let datastore = require('../../models/bookings');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;

chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash');

    describe('Customers', () => {

        describe('GET /customers', () => {
            it('should return all the customers in an array', function (done) {

                chai.request(server)
                
                    .get('/customers')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(2);
                        let result = _.map(res.body, (customer) => {
                            return {                              
                                customerID: customer.customerID,
                                name: customer.name,
                                email: customer.email,
                                password: customer.password
                            }
                        });
                    expect(result).to.include({ 
                     
                        customerID: 10000920,
                        name: "Yvette",
                        email: "Yvette@wit.ie",
                        password: "21323"
                    });
                    done();
                });
        });

    });
});