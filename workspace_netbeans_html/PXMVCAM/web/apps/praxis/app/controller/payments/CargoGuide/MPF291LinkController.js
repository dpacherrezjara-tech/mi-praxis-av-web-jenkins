Ext.define('Ext.Praxis.controller.payments.CargoGuide.MPF291LinkController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MPF291LinkController',

    afterRender: function () {
        var p = this.view.params || {};
        this.mpf295 = p.mpf295 || {};
        this.renderHeader();
        this.enableSelectionTracking();
        this.searchMPF291();
    },

    renderHeader: function () {
        var d = this.mpf295;
        var html =
            '<table style="font-size:12px; line-height:20px; border-collapse:collapse;">' +
            '<tr>' +
            '<td style="color:#546e7a; width:90px;">Customer</td>' +
            '<td style="font-weight:bold; color:#1a237e; padding-right:24px;">' + (d.CCUST || '-') + '</td>' +
            '<td style="color:#546e7a; width:70px;">NPAGE</td>' +
            '<td style="font-weight:bold; color:#1a237e; padding-right:24px;">' + (d.NPAGE || '-') + '</td>' +
            '<td style="color:#546e7a; width:70px;">PAYDAY</td>' +
            '<td style="font-weight:bold; color:#1a237e; padding-right:24px;">' + (d.PAYDAY || '-') + '</td>' +
            '<td style="color:#546e7a; width:70px;">CBATCH</td>' +
            '<td style="font-weight:bold; color:#1565C0;">' + (d.CBATCH || '(none)') + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="color:#546e7a;">SFILE</td>' +
            '<td colspan="7" style="font-weight:bold; color:#0d47a1; font-size:11px;">' + (d.SFILE || '-') + '</td>' +
            '</tr>' +
            '</table>';
        Ext.getCmp(prototype.id + '-lnk-headerInfo').update(html);
    },

    enableSelectionTracking: function () {
        var grid = Ext.getCmp(prototype.id + '-lnk-gridMPF291');
        var btn  = Ext.getCmp(prototype.id + '-lnk-btnLink');
        grid.getSelectionModel().on('selectionchange', function (sm, selected) {
            btn.setDisabled(selected.length === 0);
        });
    },

    searchMPF291: function () {
        var win  = this.view;
        var d    = this.mpf295;
        var grid = Ext.getCmp(prototype.id + '-lnk-gridMPF291');

        var bean = {
            IN_CCUST: d.CCUST || '',
            IN_SFILE: d.SFILE || ''
        };

        win.mask('Searching MPF291...');

        Ext.Ajax.request({
            url: prototype.url + '/searchMPF291',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            success: function (response) {
                win.unmask();
                var res = Ext.JSON.decode(response.responseText);
                var data = res.data || [];
                grid.getStore().loadData(data);
                if (data.length === 0) {
                    global.Msg({msg: 'No MPF291 records found for SFILE: ' + (d.SFILE || '')});
                }
            },
            failure: function () {
                win.unmask();
                Ext.Msg.alert('Error', 'Connection error. Please try again.');
            }
        });
    },

    onLinkClick: function () {
        var grid     = Ext.getCmp(prototype.id + '-lnk-gridMPF291');
        var selected = grid.getSelectionModel().getSelection();
        var win      = this.view;
        var d        = this.mpf295;

        if (!selected || selected.length === 0) {
            Ext.Msg.alert('Warning', 'Please select at least one MPF291 record.');
            return;
        }

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Link <b>' + selected.length + '</b> MPF291 record(s) to this MPF295 header?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            scope: this,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.doLink(selected, d, win);
                }
            }
        });
    },

    doLink: function (selected, d, win) {
        var records = selected.map(function (rec) {
            return {
                AWBNO:  rec.get('AWBNO'),
                NCICLO: rec.get('NCICLO')
            };
        });

        var payload = {
            IN_SFILE:  d.SFILE  || '',
            IN_NPAGE:  d.NPAGE  || '',
            IN_PAYDAY: d.PAYDAY || '',
            IN_TYPE:   d.TYPE   || '',
            IN_SEQ:    d.SEQ    || '',
            IN_CBATCH: d.CBATCH || '',
            IN_DATEBAT: d.DATEBAT || '',
            selected:  records
        };

        win.mask('Linking records...');

        Ext.Ajax.request({
            url: prototype.url + '/linkMPF291',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(payload)},
            success: function (response) {
                win.unmask();
                var res = Ext.JSON.decode(response.responseText);
                Ext.Msg.show({
                    title: '.:PRAXIS:.',
                    msg: res.Mensaje || (res.success ? 'Records linked successfully.' : 'Error linking records.'),
                    buttons: Ext.MessageBox.OK,
                    icon: res.success ? Ext.MessageBox.INFO : Ext.MessageBox.WARNING,
                    fn: function () {
                        if (res.success) {
                            win.close();
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click');
                        }
                    }
                });
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
