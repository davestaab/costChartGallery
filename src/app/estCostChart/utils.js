import { flatMap } from 'lodash';
import d3 from 'd3';
import moment from 'moment';

export function translate(x,y){
    return `translate(${x}, ${y})`;
}

/**
 * selection should be a svg defs element
 * @param {selection} selection d3 selection to gradient to. Should be a svg defs selection
 * @param {string}    id           id to use for the gradient
 * @param {array[string]} stops     array of classes to use for the stop colors
 */
export function gradient(selection, id, stops) {
    var gradient = selection.append('linearGradient')
        .attr('id', id);
    stops.forEach((d, i) => {
        // Create the stops of the main gradient. Each stop will be assigned
        // a class to style the stop using CSS.
        gradient.append('stop')
            .attr('class', d)
            .attr('offset', i);
    });
}


export function createYears(...years){
    return flatMap(years, (y) => {
        return d3.range(1, 13).map(m => y + (m<=9 ? '0' + m : '' + m));
    })
}

export function legendDataFromDomain(domain, year){
    return domain.reduce((result, d, i) => {
        const localYear = moment(d, 'YYYYMM').year();
        const period = localYear < year ? 'past' :
            localYear > year ? 'future' : 'present';
        // start if first
        if(result.length === 0){
            result.push(createLegend(period, d));
        }
        if(peekBack(result).label !== period){
            peekBack(result).range.push(d);
            result.push(createLegend(period, d));
        }
        // finish if last
        if(i === domain.length-1){
            peekBack(result).range.push(d)
        }
        return result;
    }, []);
}

function createLegend(period, rangeStart){
    return {
        label: period,
        range: [rangeStart]
    };
}

export function domainByYear(domain){
    return domain.reduce((result, d) => {
        const year = '' + moment(d, 'YYYYMM').year();
        // console.log('year', year, d);
        if(!result[year]) {
            result[year] = [d,d];
            // console.log('no result year', result);
            return result;
        }
        result[year] = [result[year][0], d];
        // console.log('updating result year', result);
        return result;
    }, {})
}

export function peekBack(a) {
    return a[a.length-1];
}
