Ext.define('Ext.Praxis.controller.payments.CargoSend.DataEntryCargoSendController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCargoSendController',

    init: function (view) {
        me = this;
        this.p = this.view.params || {};
    },

    afterRender: function () {
        this.loadCountries();
    },

    loadCountries: function () {
        var me = this;
        var cmbCountry    = Ext.getCmp(prototype.idDE + '-cmbCountry');
        var cmbReportType = Ext.getCmp(prototype.idDE + '-cmbReportType');

        var applyFilter = function (allCountries) {
            me.allCountries = allCountries;
            me.filterCountriesByReportType();
        };

        if (cmbCountry && win && win.lstCountry) {
            applyFilter(win.lstCountry);
        } else {
            Ext.Ajax.request({
                url: prototype.urlMaster + '/obtainData',
                method: 'POST',
                timeout: 60000,
                params: { beanString: JSON.stringify({ COUNTRY: 2 }) },
                success: function (response) {
                    var res = Ext.JSON.decode(response.responseText);
                    applyFilter(res.lstCountry);
                }
            });
        }
    },

    filterCountriesByReportType: function () {
        var cmbCountry    = Ext.getCmp(prototype.idDE + '-cmbCountry');
        var cmbReportType = Ext.getCmp(prototype.idDE + '-cmbReportType');
        if (!cmbCountry) { return; }

        var reportType = cmbReportType ? cmbReportType.getValue() : 'PSE';
        var allowedCodes = reportType === 'PSE' ? ['CO'] : ['CO', 'HN', 'SV'];

        var allCountries = this.allCountries || [];
        var filtered = allCountries.filter(function (c) {
            return allowedCodes.indexOf((c.A006PAIS || '').trim()) !== -1;
        });

        var store = Ext.create('Ext.data.Store', {
            fields: ['A006PAIS', 'A006NOMBRE'],
            data: filtered
        });
        cmbCountry.bindStore(store);
        cmbCountry.setValue('CO');
    },

    getDateValue: function (id) {
        var field = Ext.getCmp(prototype.idDE + id);
        if (!field || !field.getValue()) return '';
        var d = field.getValue();
        var y = d.getFullYear();
        var m = String(d.getMonth() + 1).padStart(2, '0');
        var day = String(d.getDate()).padStart(2, '0');
        return '' + y + m + day;
    },

    onProcessClick: function () {
        me = this;
        var cmbCountry    = Ext.getCmp(prototype.idDE + '-cmbCountry');
        var cmbReportType = Ext.getCmp(prototype.idDE + '-cmbReportType');
        var country       = (cmbCountry    && cmbCountry.getValue())    ? cmbCountry.getValue()    : '';
        var reportType    = (cmbReportType && cmbReportType.getValue()) ? cmbReportType.getValue() : 'PSE';
        var dateFrom      = me.getDateValue('-dtFrom');
        var dateTo        = me.getDateValue('-dtTo');

        var errors = [];

        if (!country) {
            errors.push('&bull; Debe seleccionar un <b>País</b>.');
        }
        if (!dateFrom || !/^\d{8}$/.test(dateFrom)) {
            errors.push('&bull; Debe ingresar una <b>Fecha Desde</b> válida (formato: YYYYMMDD).');
        }
        if (!dateTo || !/^\d{8}$/.test(dateTo)) {
            errors.push('&bull; Debe ingresar una <b>Fecha Hasta</b> válida (formato: YYYYMMDD).');
        }
        if (errors.length === 0 && dateFrom > dateTo) {
            errors.push('&bull; La <b>Fecha Desde</b> no puede ser mayor que la <b>Fecha Hasta</b>.');
        }

        if (errors.length > 0) {
            Ext.Msg.alert('.:PRAXIS:. - Validación', errors.join('<br>'));
            if (!country) { cmbCountry.focus(); }
            return;
        }

        Ext.Msg.confirm(
            '.:PRAXIS:.',
            'Are you sure you want to generate the report?<br>' +
            '<b>Report Type:</b> ' + reportType + ' &nbsp; <b>Country:</b> ' + country +
            ' &nbsp; <b>From:</b> ' + dateFrom + ' &nbsp; <b>To:</b> ' + dateTo,
            function (btn) {
                if (btn !== 'yes') { return; }

                var urlExport;
                if (reportType === 'PSE') {
                    var beanString = JSON.stringify({
                        IN_FECHA_FROM: dateFrom,
                        IN_FECHA_TO:   dateTo
                    });
                    urlExport = prototype.url + '/exportExcelPSE?beanString=' + encodeURIComponent(beanString);
                } else {
                    var beanString = JSON.stringify({
                        IN_FECHA_FROM: dateFrom,
                        IN_FECHA_TO:   dateTo,
                        IN_COUNTRY:    country
                    });
                    urlExport = prototype.url + '/exportExcel?beanString=' + encodeURIComponent(beanString);
                }

                window.open(urlExport, '_blank');
            }
        );
    },

    onCancelClick: function () {
        this.view.close();
    }
});
