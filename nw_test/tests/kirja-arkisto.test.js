module.exports = {
    'Kirja-arkisto': function (browser) {
        browser
            .url('http://localhost:3000/login')
            .waitForElementVisible('body', 1000)
            .assert.title('Kirja Arkisto')
            .pause(1000)
            .setValue('input[type=käyttäjätunnus]', 'admin')
            .setValue('input[type=password]', 'admin')
            .pause(1000)
            .click('button[id=login]')
            .pause(1000)
            .click('button[id=kirjastoon]')
            .pause(1000)

            .click('a.nav-link[href="/admin"]')
            .click('button[id=btn-lisaa-kirja]')
            .setValue('input[id="name"]', 'Testikirja')
            .setValue('input[id="author"]', 'Testikirjailija')
            .setValue('input[id="releasedate"]', '12.12.2012')
            .setValue('input[id="pages"]', '123456789')
            .setValue('input[id="text"]', 'kuvailevaaa tektstiääää')
            .setValue('input[id="draw"]', 'niko, ossi, onni, topi')
            .setValue('input[id="pic"]', require('path').resolve(__dirname + '/testikuva.png'))
            .click('input[id="cbseries"]')
            .pause(1000)
            .click('button[id=add]')
            .pause(1000)

            .click('a.nav-link[href="/admin"]')
            .click('button[id=btn-lisaa-sarja]')
            .setValue('input[id="name"]', 'Testisarja')
            .setValue('input[id="publisher"]', 'Testisarjakustantaja')
            .setValue('input[id="desc"]', 'testataan sarjojen lisäämistä')
            .setValue('select[id="class"]', '4')
            .setValue('input[id="idnum"', '1238899819812305948')
            .setValue('input[id="spic"]', require('path').resolve(__dirname + '/testikuva.png'))

            .pause(1000)
            .click('button[id="add-series')
            .pause(1000)
            
            .end();
    }
};