Ext.define('Ext.Praxis.controller.payments.CargoSend.DataEntryEditCargoSendController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryEditCargoSendController',

    init: function (view) {
        me = this;
        this.p = this.view.params || {};
    },

    afterRender: function () {
        var p = this.p;
        Ext.getCmp(prototype.idDEEdit + '-txtSREPID').setValue(p.SREPID   || '');
        Ext.getCmp(prototype.idDEEdit + '-txtNAMEFILE').setValue(p.NAMEFILE || '');
        Ext.getCmp(prototype.idDEEdit + '-cmbSTVAL').setValue(p.STVAL     || '0');
    },

    onSaveClick: function () {
        var srepid = Ext.getCmp(prototype.idDEEdit + '-txtSREPID').getValue()  || '';
        var stval  = Ext.getCmp(prototype.idDEEdit + '-cmbSTVAL').getValue();

        if (!stval && stval !== '0') {
            Ext.Msg.alert('.:PRAXIS:.', 'Please select a Status.');
            return;
        }

        if (stval === '2') {
            Ext.Msg.confirm(
                '.:PRAXIS:.',
                'Are you sure you want to <b>reverse</b> this report?<br>' +
                'This will remove the report record and clear all marked registries.<br><br>' +
                '<b>Report ID:</b> ' + srepid,
                function (btn) {
                    if (btn !== 'yes') { return; }
                    me.doSave(srepid, stval);
                }
            );
        } else {
            me.doSave(srepid, stval);
        }
    },

    doSave: function (srepid, stval) {
        var view = me.view;

        Ext.Ajax.request({
            url: prototype.url + '/updateStatusMPS718',
            method: 'POST',
            timeout: 60000,
            params: {
                beanString: JSON.stringify({
                    IN_SREPID: srepid,
                    IN_STVAL:  stval
                })
            },
            success: function (response) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.Msg.alert('.:PRAXIS:.', res.Mensaje || 'Status updated successfully.', function () {
                        view.close();
                        // Refrescar la grilla
                        var ctrl = view.up('form') && Ext.getCmp(prototype.id + '-xpanel');
                        if (ctrl) {
                            var cargoCtrl = Ext.getCmp(prototype.id + '-xpanel').up('panel') &&
                                            Ext.ComponentQuery.query('CargoSendForm')[0];
                        }
                        // Disparar búsqueda para refrescar
                        var btnSearch = Ext.getCmp(prototype.id + '-btnSearch');
                        if (btnSearch) { btnSearch.fireEvent('click', btnSearch); }
                    });
                } else {
                    Ext.Msg.alert('.:PRAXIS:.', res.Mensaje || 'An error occurred.');
                }
            },
            failure: function () {
                Ext.Msg.alert('.:PRAXIS:.', 'Communication error with the server.');
            }
        });
    },

    onCancelClick: function () {
        this.view.close();
    }
});
