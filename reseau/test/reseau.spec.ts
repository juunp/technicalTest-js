import assert = require('assert');
import reseau = require('../reseau');

describe('plan function', () => {
    it('checks validity of network argument', () => {
        assert.throws(() => {
            reseau.plan(null);
        }, err => {
            return err instanceof Error && /invalid input/.test(err.toString());
        })

        assert.throws(() => {
            reseau.plan(undefined);
        }, err => {
            return err instanceof Error && /invalid input/.test(err.toString());
        })
    })
    it('checks if there is more than 1 network cable', () => {
        var network = {
            cables: 0,
            minSecond: 0,
            maxSecond: 15,
            planning: [],
            lendedCables: []
        };
        assert.throws(() => {
            reseau.plan(network);
        }, err => {
            return err instanceof Error && /cables stock should be between 1 and 500/.test(err.toString());
        })
    })

    it('checks if there is less than 500 network cable', () => {
        var network = {
            cables: 515,
            minSecond: 0,
            maxSecond: 15,
            planning: [],
            lendedCables: []
        };
        assert.throws(() => {
            reseau.plan(network);
        }, err => {
            return err instanceof Error && /cables stock should be between 1 and 500/.test(err.toString());
        })
    })

    it('checks if cable requests are superior to 0', () => {
        var network = {
            cables: 30,
            minSecond: 1,
            maxSecond: 15,
            planning: [],
            lendedCables: []
        };
        assert.throws(() => {
            reseau.plan(network);
        }, err => {
            return err instanceof Error && /requests should be between 1 and cables stock \* 3/.test(err.toString());
        })
    })

    it('checks if cable requests are superior to 3 times the amount of cables', () => {
        var network = {
            cables: 1,
            minSecond: 1,
            maxSecond: 15,
            planning: [[1,2], [1,3], [1,4], [2,2]],
            lendedCables: []
        };
        assert.throws(() => {
            reseau.plan(network);
        }, err => {
            return err instanceof Error && /requests should be between 1 and cables stock \* 3/.test(err.toString());
        })
    })

    it('checks time flow', () => {
        var network = {
            cables: 1,
            minSecond: 15,
            maxSecond: 2,
            planning: [[1,2]],
            lendedCables: []
        };
        assert.throws(() => {
            reseau.plan(network);
        }, err => {
            return err instanceof Error && /time cannot be played with/.test(err.toString());
        })
    });

    it('checks if futur is not upon us', () => {
        var network = {
            cables: 1,
            minSecond: 1,
            maxSecond: 15,
            planning: [[2501,2]],
            lendedCables: []
        };
        assert.throws(() => {
            reseau.plan(network);
        }, err => {
            return err instanceof Error && /date should be inferior to 2500/.test(err.toString());
        })
        network.planning = [[1,2502]]
        assert.throws(() => {
            reseau.plan(network);
        }, err => {
            return err instanceof Error && /date should be inferior to 2500/.test(err.toString());
        })
    })

    it('checks if dates are consistent', () => {
        var network = {
            cables: 1,
            minSecond: 1,
            maxSecond: 15,
            planning: [[500,2]],
            lendedCables: []
        };
        assert.throws(() => {
            reseau.plan(network);
        }, err => {
            return err instanceof Error && /start and end dates should be consistent/.test(err.toString());
        })
    })

    it('returns "pas possible" when cable demand is too high', () => {
        const network = {
            cables: 1,
            minSecond: 1,
            maxSecond: 15,
            planning: [[1,3], [1,4]],
            lendedCables: []
        };
        const str = reseau.plan(network);
        assert.strictEqual(str, "pas possible");
    })

    it('returns cable id every time a cable is requested and cable demand is not too high: input1', () => {
        const network = {
            cables: 10,
            minSecond: 787,
            maxSecond: 2376,
            planning: [[2063, 2131], [787, 2211], [2199, 2376]],
            lendedCables: []
        };
        const str = reseau.plan(network);
        assert.strictEqual(str, "1 2 3");
    })

    it('returns cable id every time a cable is requested and cable demand is not too high: input2', () => {
        const network = {
            cables: 10,
            minSecond: 174,
            maxSecond: 204,
            planning: [
            [174, 175],
            [175, 176],
            [176, 177],
            [177, 178],
            [178, 179],
            [179, 180],
            [180, 181],
            [181, 182],
            [182, 183],
            [183, 184],
            [184, 185],
            [185, 186],
            [186, 187],
            [187, 188],
            [188, 189],
            [189, 190],
            [190, 191],
            [191, 192],
            [192, 193],
            [193, 194],
            [194, 195],
            [195, 196],
            [196, 197],
            [197, 198],
            [198, 199],
            [199, 200],
            [200, 201],
            [201, 202],
            [202, 203],
            [203, 204]
        ],
            lendedCables: []
        };
        const str = reseau.plan(network);
        assert.strictEqual(str, "1 2 3 4 5 6 7 8 9 10 1 2 3 4 5 6 7 8 9 10 1 2 3 4 5 6 7 8 9 10");
    })

    it('returns cable id every time a cable is requested and cable demand is not too high: input3', () => {
        const network = {
            cables: 10,
            minSecond: 82,
            maxSecond: 2478,
            planning: [
                [1356, 2230],
                [1740, 2189],
                [1786, 1894],
                [2044, 2466],
                [522, 1082],
                [1723, 2478],
                [1722, 2047],
                [1237, 1662],
                [1180, 1453],
                [513, 1976],
                [1192, 1512],
                [1847, 2208],
                [1517, 2134],
                [1760, 1851],
                [2152, 2328],
                [1552, 2158],
                [1860, 2277],
                [2154, 2477],
                [2081, 2359],
                [1018, 1623],
                [1534, 2080],
                [82, 1942]
        ],
            lendedCables: []
        };
        const str = reseau.plan(network);
        assert.strictEqual(str, "pas possible");
    })

    it('returns cable id every time a cable is requested and cable demand is not too high: input4', () => {
        const network = {
            cables: 10,
            minSecond: 16,
            maxSecond: 641,
            planning: [
                [114, 641],
                [273, 641],
                [175, 641],
                [431, 641],
                [533, 641],
                [20 ,641],
                [243, 641],
                [154, 641],
                [16 ,641],
                [191, 641],
                [491, 641],
                [198, 641]
        ],
            lendedCables: []
        };
        const str = reseau.plan(network);
        assert.strictEqual(str, "pas possible");
    })

    it('returns cable id every time a cable is requested and cable demand is not too high: input5', () => {
        const network = {
            cables: 50,
            minSecond: 79,
            maxSecond: 2494,
            planning: [
                [610, 1367],
                [1570, 1810],
                [2270, 2414],
                [84, 2022],
                [1448, 1736],
                [1055, 2127],
                [1958, 2026],
                [1796, 2358],
                [2094, 2440],
                [2317, 2346],
                [1228, 2394],
                [559, 607],
                [2488, 2494],
                [360, 2221],
                [2443, 2468],
                [1152, 2059],
                [1565, 2465],
                [2313, 2473],
                [1394, 2072],
                [2172, 2421],
                [1159, 1438],
                [1942, 2185],
                [1281, 1798],
                [2077, 2178],
                [1929, 1931],
                [79, 2348],
                [893, 1086],
                [710, 1035],
                [1066, 1071]
        ],
            lendedCables: []
        };
        const str = reseau.plan(network);
        assert.strictEqual(str, "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29");
    })

    it('returns cable id every time a cable is requested and cable demand is not too high: input6', () => {
        const network = {
            cables: 50,
            minSecond: 1970,
            maxSecond: 2081,
            planning: [
                [1970, 1971],
                [1971, 1972],
                [1972, 1973],
                [1973, 1974],
                [1974, 1975],
                [1975, 1976],
                [1976, 1977],
                [1977, 1978],
                [1978, 1979],
                [1979, 1980],
                [1980, 1981],
                [1981, 1982],
                [1982, 1983],
                [1983, 1984],
                [1984, 1985],
                [1985, 1986],
                [1986, 1987],
                [1987, 1988],
                [1988, 1989],
                [1989, 1990],
                [1990, 1991],
                [1991, 1992],
                [1992, 1993],
                [1993, 1994],
                [1994, 1995],
                [1995, 1996],
                [1996, 1997],
                [1997, 1998],
                [1998, 1999],
                [1999, 2000],
                [2000, 2001],
                [2001, 2002],
                [2002, 2003],
                [2003, 2004],
                [2004, 2005],
                [2005, 2006],
                [2006, 2007],
                [2007, 2008],
                [2008, 2009],
                [2009, 2010],
                [2010, 2011],
                [2011, 2012],
                [2012, 2013],
                [2013, 2014],
                [2014, 2015],
                [2015, 2016],
                [2016, 2017],
                [2017, 2018],
                [2018, 2019],
                [2019, 2020],
                [2020, 2021],
                [2021, 2022],
                [2022, 2023],
                [2023, 2024],
                [2024, 2025],
                [2025, 2026],
                [2026, 2027],
                [2027, 2028],
                [2028, 2029],
                [2029, 2030],
                [2030, 2031],
                [2031, 2032],
                [2032, 2033],
                [2033, 2034],
                [2034, 2035],
                [2035, 2036],
                [2036, 2037],
                [2037, 2038],
                [2038, 2039],
                [2039, 2040],
                [2040, 2041],
                [2041, 2042],
                [2042, 2043],
                [2043, 2044],
                [2044, 2045],
                [2045, 2046],
                [2046, 2047],
                [2047, 2048],
                [2048, 2049],
                [2049, 2050],
                [2050, 2051],
                [2051, 2052],
                [2052, 2053],
                [2053, 2054],
                [2054, 2055],
                [2055, 2056],
                [2056, 2057],
                [2057, 2058],
                [2058, 2059],
                [2059, 2060],
                [2060, 2061],
                [2061, 2062],
                [2062, 2063],
                [2063, 2064],
                [2064, 2065],
                [2065, 2066],
                [2066, 2067],
                [2067, 2068],
                [2068, 2069],
                [2069, 2070],
                [2070, 2071],
                [2071, 2072],
                [2072, 2073],
                [2073, 2074],
                [2074, 2075],
                [2075, 2076],
                [2076, 2077],
                [2077, 2078],
                [2078, 2079],
                [2079, 2080],
                [2080, 2081]
        ],
            lendedCables: []
        };
        const str = reseau.plan(network);
        assert.strictEqual(str, "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 1 2 3 4 5 6 7 8 9 10 11");
    })

    it('returns cable id every time a cable is requested and cable demand is not too high: input7', () => {
        const network = {
            cables: 50,
            minSecond: 10,
            maxSecond: 2476,
            planning: [
                [1635, 1811], 
                [2115, 2476],
                [327, 1391],
                [932, 2355],
                [2393, 2404],
                [2365, 2380],
                [1557, 2001],
                [614, 976],
                [574, 1707],
                [221, 419],
                [2168, 2256],
                [1505, 2243],
                [247, 891],
                [10, 2099],
                [2419, 2442],
                [1244, 1393],
                [621, 2456],
                [683, 1771],
                [1846, 2380],
                [1851, 2125],
                [2172, 2401],
                [1740, 2412],
                [2248, 2440],
                [1980, 2374],
                [664, 2335],
                [175, 1976],
                [1361, 2360],
                [2300, 2497],
                [1790, 2193],
                [138, 2102],
                [567, 2071],
                [319, 2335],
                [703, 2337],
                [2325, 2460],
                [2201, 2468],
                [1903, 2320],
                [1111, 1999],
                [1243, 1946],
                [2209, 2228],
                [1441, 1947],
                [2141, 2328],
                [1516, 2270],
                [1220, 2295],
                [881, 2159],
                [530, 1562],
                [2326, 2411],
                [950, 1527],
                [2247, 2497],
                [115, 2133],
                [2370, 2464],
                [2251, 2437],
                [930, 1890],
                [658, 1597],
                [2046, 2304],
                [2017, 2405],
                [97, 2416],
                [1909, 2052],
                [625, 1870],
                [2216, 2246],
                [547, 1749],
                [2437, 2457],
                [936, 2334],
                [524, 1941],
                [1094, 1503],
                [1629, 2059],
                [2318, 2461],
                [400, 1720],
                [2176, 2373],
                [2242, 2274],
                [696, 2383],
                [1035, 1355],
                [1654, 2343],
                [1343, 1369],
                [802, 2309],
                [1851, 1920],
                [1073, 2283],
                [1398, 2257],
                [463, 1852],
                [2268, 2340],
                [2036, 2321],
                [345, 1935],
                [595, 1819],
                [63, 986],
                [1843, 1950],
                [424, 1140],
                [1121, 1960],
                [1209, 2280],
                [931, 1176],
                [348, 1936],
                [162, 266],
                [2197, 2261],
                [1977, 2003],
                [689, 2130],
                [1659, 1882],
                [596, 2182],
                [1014, 2296],
                [1299, 1796],
                [1535, 2112],
                [1359, 1825],
                [1558, 1972],
                [1525, 2001],
                [39, 1691],
                [102, 1323],
                [1690, 2045],
                [278, 1147],
                [1057, 1091],
                [1089, 1740],
                [627, 1527],
                [1296, 1688],
                [1545, 1571],
                [738, 1066],
                [1723, 2203],
                [1743, 1748],
                [451, 2384],
                [1163, 2009],
                [1619, 1628],
                [1881, 2323],
                [1484, 2092],
                [2314, 2424],
                [584, 1822]
        ],
            lendedCables: []
        };
        const str = reseau.plan(network);
        assert.strictEqual(str, "pas possible");
    })
})