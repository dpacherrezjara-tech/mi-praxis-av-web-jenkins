Ext.define('Ext.Praxis.controller.payments.CargoGuide.GenerarCarteraController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GenerarCarteraController',

    onDownloadClick: function () {
        var country = Ext.getCmp(prototype.id + '-cart-cmbCountry').getValue() || '';
        var sfile   = (Ext.getCmp(prototype.id + '-cart-txtSFile').getValue() || '').trim();

        if (!country) {
            Ext.Msg.alert('.:PRAXIS:.', 'Please select a country.');
            return;
        }
        if (!sfile) {
            Ext.Msg.alert('.:PRAXIS:.', 'Please enter a SFILE value.');
            return;
        }

        var win = this.view;
        win.mask('Generating Conciliation Excel...');
        setTimeout(function () { win.unmask(); }, 12000);

        global.getFile(
            prototype.url + '/getCartera'
            + '?country=' + encodeURIComponent(country)
            + '&sfile='   + encodeURIComponent(sfile)
        );
    },

    onCancelClick: function () {
        this.view.close();
    }
});
