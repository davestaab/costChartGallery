import { peekBack, translate, createYears, createLegend, legendDataFromDomain, domainByYear } from './utils';

describe('utils', () => {

    describe('peekBack', () => {
        it('should return the last item', () => {
        expect(peekBack([1])).toBe(1);
        })
        it('should work with empty array', () => {
            expect(peekBack([])).toBeUndefined();
        })
    });

    describe('translate', () => {
        it('should return svg translate string', () => {
            expect(translate(10, 20)).toEqual('translate(10, 20)');
        });
    })
    describe('createYears', () => {
        it('should generate a dataset', () => {
            expect(createYears(2016)).toEqual([
                '201601',
                '201602',
                '201603',
                '201604',
                '201605',
                '201606',
                '201607',
                '201608',
                '201609',
                '201610',
                '201611',
                '201612',
            ]);
        });
        it('should generate a 2 year dataset', () => {
            expect(createYears(2016, 2017)).toEqual([
                '201601',
                '201602',
                '201603',
                '201604',
                '201605',
                '201606',
                '201607',
                '201608',
                '201609',
                '201610',
                '201611',
                '201612',
                '201701',
                '201702',
                '201703',
                '201704',
                '201705',
                '201706',
                '201707',
                '201708',
                '201709',
                '201710',
                '201711',
                '201712',
            ]);
        });
    });

    describe('legendDataFromDomain', () => {

       it('should create a 3 part legend', () => {
           expect(legendDataFromDomain(createYears(2016,2017,2018), 2017)).toEqual([
               {
                   label: 'past',
                   range: ['201601', '201701']
               },
               {
                   label: 'present',
                   range: ['201701', '201801']
               },
               {
                   label: 'future',
                   range: ['201801', '201812']
               },
           ])
       });
       it('should create only a past legend', () => {
           expect(legendDataFromDomain(createYears(2016), 2017)).toEqual([
               {
                   label: 'past',
                   range: ['201601', '201612']
               }
           ])
       });
       it('should create only a future legend', () => {
           expect(legendDataFromDomain(createYears(2016), 2015)).toEqual([
               {
                   label: 'future',
                   range: ['201601', '201612']
               }
           ])
       });
       it('should create only a present legend', () => {
           expect(legendDataFromDomain(createYears(2016), 2016)).toEqual([
               {
                   label: 'present',
                   range: ['201601', '201612']
               }
           ])
       });
       it('should create only a past & present legend', () => {
           expect(legendDataFromDomain(createYears(2015, 2016), 2016)).toEqual([
               {
                   label: 'past',
                   range: ['201501', '201601']
               },
               {
                   label: 'present',
                   range: ['201601', '201612']
               },
           ])
       });
       it('should create only a present & future legend', () => {
           expect(legendDataFromDomain(createYears(2016, 2017), 2016)).toEqual([
               {
                   label: 'present',
                   range: ['201601', '201701']
               },
               {
                   label: 'future',
                   range: ['201701', '201712']
               }
           ])
       });
       it('should work with short domains', () => {
           expect(legendDataFromDomain(['201612', '201701'], 2016)).toEqual([
               {
                   label: 'present',
                   range: ['201612', '201701']
               },
               {
                   label: 'future',
                   range: ['201701', '201701']
               }
           ])
       });
       it('should work with short domains 3 parts', () => {
           expect(legendDataFromDomain(['201512', '201612', '201701'], 2016)).toEqual([
               {
                   label: 'past',
                   range: ['201512', '201612']
               },
               {
                   label: 'present',
                   range: ['201612', '201701']
               },
               {
                   label: 'future',
                   range: ['201701', '201701']
               }
           ])
       });
    });

    describe('domainByYear', () => {
        it('should group start/end month of domain',  () => {
            expect(domainByYear(['201601', '201602'])).toEqual  ({
                '2016': ['201601', '201602']
            });
            expect(domainByYear(['201601', '201602', '201701'])).toEqual  ({
                '2016': ['201601', '201602'],
                '2017': ['201701', '201701'],
            });
        })
    });
})
