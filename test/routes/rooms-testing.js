//let datastore = require('../../models/bookings');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;

chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash');

    describe('Rooms', () => {

        describe('GET /rooms', () => {
            it('should return all the rooms in an array', function (done) {

                chai.request(server)
                //chai.request(app)
                    .get('/rooms')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(5);
                        let result = _.map(res.body, (room) => {
                            return {                              
                                roomNum: room.roomNum,
                                price: room.price,
                                type: room.type
                            }
                        });
                    expect(result).to.include({ 
                        "id": "5bc3bc94fb6fc0602745615a",
                        "roomNum": 103,
                        "price": 50,
                        "style":"single"
                    });
                    done();
                });
        });

    });
   /* describe('Get /rooms/:roomNum', () => {
        it('should return the room with a specific room number', function(done){
            chai.request(server)
            .get('/rooms/101')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.length).to.equal(1);
                let result = _.map(res.body,(goods) => {
                    return {roomNum : rooms.roomNum}
                });
                expect(result).to.include({"roomNum": 101,"price":40,"type": "double"});
                done();
            });
        });
    });*/

});

/*describe('POST /bookings', function () {
    it('should return add a booking', function (done) {
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
    it('should return a message and the booking amount add 1', function (done) {
        chai.request(server)
            .put('/bookings/5bc24c3afb6fc0602744e6b8/amount')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                let booking = res.body.data;
                expect(booking).to.include({ customerID: 100000000, paymenttype: 'PayPal',
                date: 20181022, amount: 3, roomNum: 101, price: 30 });
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
        it('should return confirmation message and delete a booking', function (done) {
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
                    expect(result).to.include({ id:'5bc25230fb6fc0602744e89f',customerID: 100000002, paymenttype: 'Visa',
                    date: 20181022, amount: 1, roomNum: 103, price: 40 });
                   
                });
            done();
        });

    });

    describe('Booking Not Deleted!!', function () {
        it('should return a message for booking not deleted', function (done) {
            chai.request(server)
                .delete('/bookings/546988')
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
                    expect(res.body.length).to.equal(5);
                    expect(result).to.include({ id:'5bc24c3afb6fc0602744e6b8',customerID: 100000000, paymenttype: 'PayPal',
                    date: 20181022, amount: 2, roomNum: 101, price: 30 });
                    
                });
            done();
        });//end after
    });//end describe
});  */


