const request = require('request');
exports.getCases =async () => {
//     const countries = [
//         'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
//         'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
//         'Bolivia', 'Bosnia', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cabo Verde',
//         'Cambodia', 'Cameroon', 'Canada', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'DRC', 'Costa Rica',
//         `C%C3%B4te%20d'Ivoire`, 'Croatia', 'Cuba', 'Cyprus', 'Czechia', 'Denmark', 'Diamond%20Princess', 'Djibouti', 'Dominica',
//         'Dominican%20Republic', 'Ecuador', 'Egypt', 'El%20Salvador', 'Equatorial%20Guinea', 'Eritrea', 'Estonia', 'Swaziland',
//         'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada',
//         'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy%20See', 'Honduras', 'Hungary', 'Iceland', 'India',
//         'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya',
//         'S.%20Korea', 'Kosovo', 'Kuwait', 'Kyrgyzstan', `Lao%20People's Democratic%20Republic`, 'Latvia', 'Lebanon', 'Lesotho',
//         'Liberia', 'Libyan%20Arab%20Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'MS%20Zaandam', 'Madagascar', 
//         'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall%20Islands', 'Mauritania', 'Mauritius', 'Mexico', 
//         'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 
//         'New%20Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Macedonia', 'Norway', 'Oman', 'Pakistan', 'Panama', 'Papua%20New%20Guinea',
//         'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint%20Kitts%20and%20Nevis',
//         'Saint%20Lucia', 'Saint%20Vincent%20and%20the%20Grenadines', 'Samoa', 'San%20Marino', 'Sao%20Tome%20and%20Principe', 'Saudi%20Arabia',
//         'Senegal', 'Serbia', 'Seychelles', 'Sierra%20Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon%20Islands', 'Somalia',
//         'South%20Africa', 'South%20Sudan', 'Spain', 'Sri%20Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syrian%20Arab%20Republic',
//         'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Trinidad%20and%20Tobago', 'Tunisia', 'Turkey',
//         'USA', 'Uganda', 'Ukraine', 'UAE', 'UK', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'West%20Bank%20and%20Gaza',
//         'Yemen', 'Zambia', 'Zimbabwe'
// ];
    // const array = [];
    // for(let i=0; i<countries.length; i++) {
    //     const testPromise = new Promise((reslove, reject) => {
    //         request.get(`https://disease.sh/v3/covid-19/historical/${countries[i]}?lastdays=30`, function(err, res, body){
    //             if(err) console.log('false')
    //             if(res.statusCode === 200 ) {
    //                 reslove(body)
    //             }
    //         });
    //     })
    //     array.push(testPromise)
    // }
    // const getDataInfected = Promise.all(array).then(values => {
    //     return values;
    //   });
    // return getDataInfected

    const testPromise = new Promise((reslove, reject) => {
        request.get(` https://disease.sh/v3/covid-19/historical?lastdays=30`, function(err, res, body){
            if(err) console.log('false')
            if(res.statusCode === 200 ) {
                reslove(body)
            }
        });
    })
     const getData = await testPromise.then(data => {
       return data
    })
    const dataInfected = [];
    const countries = [];
    JSON.parse(getData).forEach(data => {
        const countriesDuplicate = countries.indexOf(data['country']);
        if(countriesDuplicate >= 0) {
            for(const appendInfectedPeople in dataInfected[countriesDuplicate].infected_people) {
                dataInfected[countriesDuplicate][`infected_people`][`${appendInfectedPeople}`] += data['timeline']['cases'][`${appendInfectedPeople}`]
            }
        } else {
            countries.push(data['country'])
            dataInfected.push({
                country: data['country'],
                infected_people: data['timeline']['cases']
            })
        }
    })
    return dataInfected;
};