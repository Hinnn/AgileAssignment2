let datastore = require('../../models/bookings');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;

chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash');

    describe('Bookings', () => {

        describe('GET /bookings', () => {
            it('should return all the bookings in an array', function (done) {

                chai.request(server)
                    .get('/bookings')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(3);
                        let result = _.map(res.body, (booking) => {
                            return {   
                                customerID:booking.customerID,
                                paymenttype:booking.paymenttype,
                                date:booking.date,
                                amount:booking.amount,                           
                                roomNum: booking.roomNum,
                                price: booking.price    
                            }
                        });
                    expect(result).to.include({      
                        "customerID": 10000323,
                        "paymenttype": "Master",
                        "date": 20181030,
                        "amount": 1,
                        "roomNum": "201",
                        "price": 35
                    });

                    done();
                });
        });
    });

    /*describe('GET /bookings/:_id', ()=>{
        it('should return a booking with the specific id', function (done){
            chai.request(server)
            .get('bookings/5bd5902ee7179a1b53fe9e36')
            .end((err,res) => {
                expect(res).to.have.status(200);
                expect(res.body.length).to.equal(1);
                let result = _.map(res.body, (booking) => {
                    return {customerID:booking.customerID,
                        paymenttype:booking.paymenttype,
                        date:booking.date,
                        amount:booking.amount,                           
                        roomNum: booking.roomNum,
                        price: booking.price}
                });
                expect(result).to.include({customerID: '1000202' });
                done();
                
            });

        });
    });
});*/

/*describe('POST /bookings', function () {
    it('should return confirmation message and upsate datastore', function (done) {
        let booking = {
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
                //expect(res).to.have.status(200);
              //  expect(res.body).to.be.an('array');
               // expect(res.body.length).to.equal(4);
                expect(res.body).to.have.property('message').equal('Booking Successfully Added!');
                done();

            });
        after(function (done) {
            chai.request(server)
                .get('/bookings')
                .end(function (err, res) {
                    let result = _.map(res.body, (booking) => {
                        return {
        
                            customerID: booking.customerID,
                            paymenttype: booking.paymenttype,
                            date: booking.date,
                            amount: booking.amount,
                            roomNum: booking.roomNum,
                            price: booking.price
                        };
                    });
                    expect(result).to.include({ 

                        customerID: 100000003,
                        paymenttype: 'Visa',
                        date: 20181201,
                        amount: 1200,
                        roomNum: 302,
                        price: 35 
                    });
                    done();
        });
    });  // end-after
}); // end-describe
});
});*/
/*describe('PUT /bookings/:id/amount', () => {
    it('should return a message and the booking amount add 1', function (done) {
        chai.request(server)
            .put('/bookings/5bd0b9bfd338361db8663ab0/amount')
            .end(function (err, res) {
                //expect(res).to.have.status(200);
                let booking = res.body.data;
                expect(booking).to.include({ customerID: 10000323, paymenttype: 'Master',
                date: 20181030, amount: 3, roomNum: 201, price: 35 });
                done();
            });
    });
    it('should return a 404 and a message for Booking NOT Found', function (done) {
        chai.request(server)
            .put('/bookings/10000323/amount')
            .end(function (err, res) {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message', 'Booking NOT Found!');
                done();
            });
    });
});*/


/*describe('DELETE /bookings', function () {
    describe('Deleted Successfully!', function () {
        it('should return confirmation message and delete a booking', function (done) {
            chai.request(server)
                .delete('/bookings/5bd4c91de7179a1b53fe826d')
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
                          //  id: booking.id,
                            customerID: booking.customerID,
                            paymenttype: booking.paymenttype,
                            date: booking.date,
                            amount: booking.amount,
                            roomNum: booking.roomNum,
                            price: booking.price
                        }
                    });
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(2);
                    expect(result).to.include({   
                        "customerID": 10000323,
                        "paymenttype": "Master",
                        "date": 20181030,
                        "amount": 1,
                        "roomNum": 201,
                        "price": 35});
                   
                });
            done();
        });

    });

    describe('Booking Not Deleted!!', function () {
        it('should return a message for booking not deleted', function (done) {
            chai.request(server)
                .delete('/bookings/546988')
                .end(function (err, res) {
                expect(res.body).to.have.property('message', 'Booking NOT DELETED!');
                    done();

                });
        });
        after(function (done) {
            chai.request(server)
                .get('/bookings')
                .end(function (err, res) {
                    let result = _.map(res.body, (booking) => {
                        return {
                            
                            customerID: booking.customerID,
                            paymenttype: booking.paymenttype,
                            date: booking.date,
                            amount: booking.amount,
                            roomNum: booking.roomNum,
                            price: booking.price
                        }
                    });
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(3);
                    expect(result).to.include({ 
                        "customerID": 1000202,
                        "paymenttype": "Visa",
                        "date": 20181029,
                        "amount": 2,
                        "roomNum": 102,
                        "price": 30});
                    
                });
            done();
        });//end after
    });//end describe
});  

//});*/

});