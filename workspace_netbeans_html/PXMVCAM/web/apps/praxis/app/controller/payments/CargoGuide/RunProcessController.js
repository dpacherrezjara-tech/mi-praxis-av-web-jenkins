Ext.define('Ext.Praxis.controller.payments.CargoGuide.RunProcessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RunProcessController',

    // Available combinations: country -> list of processes
    processMap: {
        'CO': [
            {code: 'FASE1',         name: 'FASE 1',         proc: 'MPS556', available: true},
            {code: 'FASE2',         name: 'FASE 2',         proc: 'MPS557', available: true},
            {code: 'FASE_GENERAL',  name: 'FASE GENERAL',   proc: null,     available: false}
        ],
        'HN': [
            {code: 'CONCILIACION',  name: 'Conciliación HN', proc: 'conciliacionHN', available: true}
        ],
        'SV': [
            {code: 'CONCILIACION',  name: 'Conciliación SV', proc: 'conciliacionSV', available: true}
        ],
        'EC': [
            {code: 'EXTRACCION_BANCOS', name: 'Extracción de Bancos', proc: 'extraccionBancosEC', available: true}
        ]
    },

    // Países cuya conciliación corre vía el backend Python (endpoint REST) y
    // por lo tanto necesitan el campo FECR. CO sigue siendo un store DB2 puro.
    _PAISES_CON_FECR: ['HN', 'SV'],

    onCountryChange: function (combo, newVal) {
        var procCombo  = Ext.getCmp(prototype.id + '-rp-cmbProcess');
        var btnExecute = Ext.getCmp(prototype.id + '-rp-btnExecute');
        var lblInfo    = Ext.getCmp(prototype.id + '-rp-lblInfo');
        var rowFecr    = Ext.getCmp(prototype.id + '-rp-rowFecr');
        var fldFecr    = Ext.getCmp(prototype.id + '-rp-fldFecr');

        procCombo.clearValue();
        btnExecute.setDisabled(true);

        if (this._PAISES_CON_FECR.indexOf(newVal) !== -1) {
            rowFecr.show();
            fldFecr.setValue(new Date());
        } else {
            rowFecr.hide();
            fldFecr.setValue(null);
        }

        if (!newVal) {
            procCombo.setDisabled(true);
            lblInfo.setValue('<span style="color:#7f8c9a; font-style:italic;">Select a country and process to see execution details.</span>');
            return;
        }

        var processes = this.processMap[newVal] || [];
        var storeData = processes.map(function (p) {
            return {
                code:      p.code,
                name:      p.available ? p.name : p.name + ' — (coming soon)',
                proc:      p.proc,
                available: p.available
            };
        });

        procCombo.getStore().loadData(storeData);
        procCombo.setDisabled(false);
        procCombo.setEmptyText('-- Select a process --');

        var hasAny = processes.some(function (p) { return p.available; });
        lblInfo.setValue(
            hasAny
                ? '<span style="color:#7f8c9a; font-style:italic;">Select a process to see execution details.</span>'
                : '<span style="color:#c0392b; font-weight:bold;">No processes are available for this country yet.</span>'
        );
    },

    onProcessChange: function (combo, newVal) {
        var country    = Ext.getCmp(prototype.id + '-rp-cmbCountry').getValue();
        var btnExecute = Ext.getCmp(prototype.id + '-rp-btnExecute');
        var lblInfo    = Ext.getCmp(prototype.id + '-rp-lblInfo');

        btnExecute.setDisabled(true);

        if (!newVal || !country) {
            return;
        }

        var processes = this.processMap[country] || [];
        var selected  = null;
        for (var i = 0; i < processes.length; i++) {
            if (processes[i].code === newVal) {
                selected = processes[i];
                break;
            }
        }

        if (!selected) return;

        if (!selected.available) {
            lblInfo.setValue(
                '<span style="color:#e67e22; font-weight:bold;">&#9888; ' +
                selected.name.replace(' — (coming soon)', '') +
                ' is not yet available for ' + country + '.</span>'
            );
            return;
        }

        lblInfo.setValue(
            '<table style="font-size:12px; line-height:20px;">' +
            '<tr><td style="color:#546e7a; width:90px;">Country</td>' +
            '<td style="font-weight:bold; color:#1a237e;">' + country + '</td></tr>' +
            '<tr><td style="color:#546e7a;">Process</td>' +
            '<td style="font-weight:bold; color:#1a237e;">' + selected.name + '</td></tr>' +
            '<tr><td style="color:#546e7a;">Procedure</td>' +
            '<td style="font-weight:bold; color:#1565C0;">' + selected.proc + '</td></tr>' +
            '</table>'
        );
        btnExecute.setDisabled(false);
    },

    onExecuteClick: function () {
        var country = Ext.getCmp(prototype.id + '-rp-cmbCountry').getValue();
        var process = Ext.getCmp(prototype.id + '-rp-cmbProcess').getValue();
        var me      = this;

        if (!country || !process) {
            Ext.Msg.alert('Warning', 'Please select a country and a process.');
            return;
        }

        var fecr = '';
        if (this._PAISES_CON_FECR.indexOf(country) !== -1) {
            var fldFecr = Ext.getCmp(prototype.id + '-rp-fldFecr');
            var dtFecr  = fldFecr.getValue();
            if (!dtFecr) {
                Ext.Msg.alert('Warning', 'Please select a FECR date.');
                return;
            }
            fecr = Ext.Date.format(dtFecr, 'Ymd');
        }

        var procCombo = Ext.getCmp(prototype.id + '-rp-cmbProcess');
        var rec       = procCombo.getStore().findRecord('code', process);
        var procName  = rec ? rec.get('name').replace(' — (coming soon)', '') : process;

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Execute <b>' + procName + '</b> for country <b>' + country + '</b>'
                + (fecr ? ' (FECR <b>' + fecr + '</b>)' : '') + '?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            scope: me,
            fn: function (btn) {
                if (btn === 'yes') {
                    me.executeProcess(country, process, fecr);
                }
            }
        });
    },

    executeProcess: function (country, process, fecr) {
        var win  = this.view;
        var bean = {country: country, process: process, fecr: fecr || ''};

        win.mask('Executing...');

        Ext.Ajax.request({
            url: prototype.url + '/runProcess',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            success: function (response) {
                win.unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: res.Mensaje || 'Process executed successfully.',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO,
                        fn: function () { win.close(); }
                    });
                } else {
                    Ext.Msg.alert('.:PRAXIS:.', res.Mensaje || 'Error executing the process.');
                    win.unmask();
                }
            },
            failure: function () {
                win.unmask();
                Ext.Msg.alert('Error', 'Connection error. Please try again.');
            }
        });
    },

    onCancelClick: function () {
        this.view.close();
    }
});
