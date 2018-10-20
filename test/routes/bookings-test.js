let datastore = require('../../models/bookings');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;

chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash');

describe('Bookings', () => {
    beforeEach(function () {
        while (datastore.length > 0) {
            datastore.pop();
        }
        datastore.push(
            { customerID: 100000000, paymenttype: 'PayPal',
            date: 20181022, amount: 2, roomNum: 101, price: 30 }
        );
        datastore.push(
            {  customerID: 100000002, paymenttype: 'Visa',
            date: 20181022, amount: 1, roomNum: 103, price: 40 }
        );
        datastore.push(
            {  customerID: 100000011, paymenttype: 'PayPal',
            date: 20181030, amount: 1, roomNum: 203, price: 40 }
        );
        datastore.push(
            {  customerID: 100000006, paymenttype: 'Master',
            date: 20181016, amount: 1, roomNum: 301, price: 30 }
        );
        datastore.push(
            {  customerID: 100000001, paymenttype: 'Direct',
            date: 20181116, amount: 1, roomNum: 102, price: 30 }
        );
    });
    describe('GET /bookings', () => {
      
        it('should return all the bookings in an array', function (done) {
            chai.request(server)
                .get('/bookings')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(5);
                    let result = _.map(res.body, (booking) => {
                        return {
                            id: booking.id,
                            customerID: booking.customerID,
                            paymenttype: booking.paymenttype,
                            date: booking.date,
                            amount: booking.amount,
                            roomNum: booking.roomNum,
                            price: booking.price
                        }
                    });
                    expect(result).to.include({ id:'5bc24c3afb6fc0602744e6b8',customerID: 100000000, paymenttype: 'PayPal',
                    date: 20181022, amount: 2, roomNum: 101, price: 30 });
                    expect(result).to.include({ id:'5bc25230fb6fc0602744e89f',customerID: 100000002, paymenttype: 'Visa',
                    date: 20181022, amount: 1, roomNum: 103, price: 40 });
                    expect(result).to.include({ id:'5bc3c04c7bff3205638b8ea1',customerID: 100000011, paymenttype: 'PayPal',
                    date: 20181030, amount: 1, roomNum: 203, price: 4 });
                    expect(result).to.include({ id:'5bc3c6f501838a05932421c2',customerID: 100000006, paymenttype: 'Master',
                    date: 20181016, amount: 1, roomNum: 301, price: 30 });
                    expect(result).to.include({ id:'5bc250b4fb6fc0602744e825',customerID: 100000001, paymenttype: 'Direct',
                    date: 20181116, amount: 1, roomNum: 102, price: 30 });
                    done();
                });
        });

    });
});
describe('POST /bookings', function () {
    it('should return confirmation message and update datastore', function (done) {
        let booking = {
            id: booking.id,
            customerID: 100000003,
            paymenttype: 'Visa',
            date: 20181201,
            amount: 1200,
            roomNum: 302,
            price: 35
        };
        chai.request(server)
            .post('/bookings')
            .send(booking)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').equal('Booking Added!');
                done();

            });
        after(function (done) {
            chai.request(server)
                .get('/bookings')
                .end(function (err, res) {
                    let result = _.map(res.body, (booking) => {
                        return {
                            id: booking.id,
                            customerID: booking.customerID,
                            paymenttype: booking.paymenttype,
                            date: booking.date,
                            amount: booking.amount,
                            roomNum: booking.roomNum,
                            price: booking.price
                        };
                    });
                    expect(result).to.include({ 
                        id: booking.id,
                        customerID: 100000003,
                        paymenttype: 'Visa',
                        date: 20181201,
                        amount: 1200,
                        roomNum: 302,
                        price: 35 
                    });
                });
            done();
        });
    });  // end-after
}); // end-describe

describe('PUT /bookings/:id/amount', () => {
    it('should return a message and the booking amount add by 1', function (done) {
        chai.request(server)
            .put('/bookings/5bc24c3afb6fc0602744e6b8/amount')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                let donation = res.body.data;
                expect(donation).to.include({ customerID: 100000000, paymenttype: 'PayPal',
                date: 20181022, amount: 2, roomNum: 101, price: 30 });
                done();
            });
    });
    it('should return a 404 and a message for invalid booking id', function (done) {
        chai.request(server)
            .put('/bookings/11009001/amount')
            .end(function (err, res) {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message', 'Invalid Booking Id!');
                done();
            });
    });
});

describe('DELETE /bookings', function () {
    describe('Deleted Successfully!', function () {
        it('should return confirmation message and delete booking', function (done) {
            chai.request(server)
                .delete('/bookings/1000001')
                
                .end(function (err, res) {
                    done();

                });
        });
        after(function (done) {
            chai.request(server)
                .get('/bookings')
                .end(function (err, res) {
                    let result = _.map(res.body, (booking) => {
                        return {
                            id: booking.id,
                            amount: booking.amount
                        }
                    });
                    expect(result).to.include({ id: 1000000, amount: 1600 });
                });
            done();
        });

    });

    describe('Booking Not Deleted!!', function () {
        it('should return a message for booking not deleted', function (done) {
            chai.request(server)
                .delete('/bookings/5bc24c3afb6fc0602744e6b8')
                .end(function (err, res) {

                    done();

                });
        });
        after(function (done) {
            chai.request(server)
                .get('/bookings')
                .end(function (err, res) {
                    let result = _.map(res.body, (booking) => {
                        return {
                            id: booking.id,
                            customerID: booking.customerID,
                            paymenttype: booking.paymenttype,
                            date: booking.date,
                            amount: booking.amount,
                            roomNum: booking.roomNum,
                            price: booking.price
                        }
                    });
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(4);
                    expect(result).to.include({ id:'5bc25230fb6fc0602744e89f',customerID: 100000002, paymenttype: 'Visa',
                    date: 20181022, amount: 1, roomNum: 103, price: 40 });
                    expect(result).to.include({ id:'5bc3c04c7bff3205638b8ea1',customerID: 100000011, paymenttype: 'PayPal',
                    date: 20181030, amount: 1, roomNum: 203, price: 4 });
                    expect(result).to.include({ id:'5bc3c6f501838a05932421c2',customerID: 100000006, paymenttype: 'Master',
                    date: 20181016, amount: 1, roomNum: 301, price: 30 });
                    expect(result).to.include({ id:'5bc250b4fb6fc0602744e825',customerID: 100000001, paymenttype: 'Direct',
                    date: 20181116, amount: 1, roomNum: 102, price: 30 });
                });
            done();
        });//end after
    });//end describe
});  


