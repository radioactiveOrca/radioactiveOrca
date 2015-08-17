var expect = require('expect.js');
var DistanceMatrix = require('../../server/googleAPI');

describe('Distance Matrix Module', function() {

  describe('DistanceMatrix: format query string', function() {
    before(function() {
      var theaters = {
        SF: [
          '845 Market Street, San Francisco, CA',
          '135 Fourth St Suite 3000, San Francisco, CA',
          '701 Mission Street, San Francisco, CA',
          '1000 Van Ness Avenue, San Francisco, CA',
          '601 Van Ness Avenue, San Francisco, CA',
          '1 Embarcadero Center, San Francisco, CA',
          '3117 16th Street, San Francisco, CA,',
          '1881 Post Street at Fillmore, San Francisco, CA'
        ],
        SJ: [
          '2190 Eastridge Loop, San Jose, CA',
          '288 South Second Street, San Jose, CA',
          '201 South Second Street, San Jose, CA ',
          '3630 Hillcap Avenue, San Jose, CA',
          '2306 Almaden Road, San Jose, CA',
          '1433 The Alameda, San Jose, CA',
          '925 Blossom Hill Rd., San Jose, CA'
        ]
      };

      var locations = {
        zips: [
          94102
        ],
        latlng: [
          '37.783529,-122.408553'
        ]
      };
    });

    beforeEach(function() {
      var params,
          querystring,
          expectedString;
    });

    it('should throw error if query is missing required parameters', function() {
      expect(function() {
        DistanceMatrix._format({});
      }).to.be.throwError();
    });

    it('should create a query string when passed required parameters', function() {
      // required are origin and destinations
      params = {
        origin: '94102',
        destinations: ['37.783529,-122.408553']
      };
      querystring = DistanceMatrix._format(params);
      expectedString = 'origins=94102&destinations=37.783529%2C-122.408553';
      expect(querystring.indexOf(expectedString)).not.to.equal(-1);
    });

    it('should not throw error if origin passed is not a string', function() {
      // zip as a number
      params = {
        origin: 94102,
        destinations: ['37.783529,-122.408553']
      };
      expect(function() {
        DistanceMatrix._format(params);
      }).not.to.be.throwError();

      // lat/lng as an array
      params = {
        origin: [37,-121],
        destinations: ['37.783529,-122.408553']
      };
      expect(function() {
        DistanceMatrix._format(params);
      }).not.to.be.throwError();
    });

    it('should remove spaces in lat/lng for the origin', function() {
      // required are origin and destinations
      params = {
        origin: '37.783529,            -122.408553',
        destinations: ['944 Market Street, San Francisco, CA']
      };
      querystring = DistanceMatrix._format(params);
      expectedString = 'origins=37.783529%2C-122.408553&destinations=944%20Market%20Street%2C%20San%20Francisco%2C%20CA';
      expect(querystring.indexOf(expectedString)).not.to.equal(-1);
    });

    it('should join multiple desinations with a pipe (pipe will be query stringified to "%7C")', function() {
      // required are origin and destinations
      params = {
        origin: '37.783529,-122.408553',
        destinations: [
          '845 Market Street, San Francisco, CA',
          '135 Fourth St Suite 3000, San Francisco, CA',
          '701 Mission Street, San Francisco, CA'
        ]
      };
      querystring = DistanceMatrix._format(params);
      expectedString =  'origins=37.783529%2C-122.408553' +
                        '&destinations=845%20Market%20Street%2C%20San%20Francisco%2C%20CA%7C' +
                        '135%20Fourth%20St%20Suite%203000%2C%20San%20Francisco%2C%20CA%7C' +
                        '701%20Mission%20Street%2C%20San%20Francisco%2C%20CA';
      expect(querystring.indexOf(expectedString)).not.to.equal(-1);
    });


    // FORMAT STRING: TRANSIT MODE and DEPARTURE TIME
    describe('DistanceMatrix: format query string: transit mode', function() {
      beforeEach(function () {
        var params = {
          origin: '37.783529, -122.408553',
          destinations: [
            '3117 16th Street, San Francisco, CA,',
            '1881 Post Street at Fillmore, San Francisco, CA'
          ]
        };
      });

      it('should provide the transit mode in lowercase', function() {
        params.mode = 'TRANSIT';
        querystring = DistanceMatrix._format(params);
        expect(querystring.indexOf('transit')).not.to.equal(-1);
        expect(querystring.indexOf('TRANSIT')).to.equal(-1);
      });

      it('should provide a departure time of "now" if the travel mode is not "transit"', function() {
        params.mode = 'driving';
        querystring = DistanceMatrix._format(params);
        expect(querystring.indexOf('departure_time=now')).not.to.equal(-1);
        params.mode = 'walking';
        querystring = DistanceMatrix._format(params);
        expect(querystring.indexOf('departure_time=now')).not.to.equal(-1);
        params.mode = 'bicycling';
        querystring = DistanceMatrix._format(params);
        expect(querystring.indexOf('departure_time=now')).not.to.equal(-1);
      });

      it('should not accept invalid transit modes', function() {
        params.mode = 'invalidmode';
        expect(function() {
          DistanceMatrix._format(params);
        }).to.be.throwError();
      });

      it('should accept valid transit modes', function() {
        var modes = ['driving','walking','bicycling','transit'];
        var fn = function() {
          DistanceMatrix._format(params);
        };
        for (var i=0; i< modes.length; i++) {
          params.mode = modes[i];
          expect(fn).not.to.be.throwError();
        }
      });

      it('should provide departure_time in seconds', function() {
        var leaveTime = new Date().getTime(); // current milliseconds
        params.mode = 'transit';
        params.departure_time = leaveTime;
        querystring = DistanceMatrix._format(params);
        // check for departure time
        var index = querystring.indexOf('departure_time');
        expect(index).not.to.equal(-1);

        // check if time is in seconds
        // seconds is 10 digits long, milliseconds is 13 digits long
        var slicedTime = querystring.slice(index + ('departure_time').length + 1);
        expect(slicedTime.length).to.equal(10);

      });
    }); // END FORMAT STRING: TRANSIT MODE and DEPARTURE TIME


  });
});