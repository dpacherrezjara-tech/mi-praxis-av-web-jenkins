Ext.define('Ext.Praxis.controller.salesaudit.Iva.DataEntryIvaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryIvaController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meEntry: '',
    bean: {},
    p: '',
    beanMant: {},
    busqueda: '',
    // </editor-fold>
    init: function (view) {
        meEntry = this;
        this.p = this.view.params;
    },
    afterRender: function () {
        switch (this.p.actionCode) {
            case 'I':
                Ext.getCmp(prototype.id + '-txtPais').setReadOnly(false);
                Ext.getCmp(prototype.id + '-txtCountryName').setReadOnly(false);
                Ext.getCmp(prototype.id + '-cmbTypeIva').setReadOnly(false);
                Ext.getCmp(prototype.id + '-txtPais').focus();
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                break;
            case 'U':
                this.mostrarData();
                Ext.getCmp(prototype.id + '-txtPais').setReadOnly(true);
                Ext.getCmp(prototype.id + '-txtCountryName').setReadOnly(true);
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                break;
        }
    },
    mostrarData: function () {
        this.setValue('txtCountryName', this.p.bean.COUNTRY.trim());
        this.setValue('txtPais', this.p.bean.CODCNTRY.trim());
        if (this.p.bean.TYPEIVA === 'SALE') {
            this.setValue('cmbTypeIva', 'V');
        } else if (this.p.bean.TYPEIVA === 'COMMISSION') {
            this.setValue('cmbTypeIva', 'C');
        } else {
            this.setValue('cmbTypeIva', 'A');
        }
        this.setValue('txtporcomi', this.p.bean.PORIVA.toFixed(2));
        this.setValue('txtseq', this.p.bean.SEQ.trim());
        this.setValue('txtcodiva', this.p.bean.CODIVA.trim());

        this.setValue('txtUSCR', this.p.bean.A2664REGIS.trim());
        this.setValue('txtFECR', this.p.bean.A2664FREGI.trim());
        this.setValue('txtHOCR', this.p.bean.A2664HREGI.trim());
        this.setValue('txtUSUP', this.p.bean.A2664REVIS.trim());
        this.setValue('txtFEUP', this.p.bean.A2664FREVI.trim());
        this.setValue('txtHOUP', this.p.bean.A2664HREVI.trim());
    },
    // <editor-fold defaultstate="collapsed" desc="button">
    onSaveClick: function (btn) {
        if (this.getValue("txtPais") === '') {
            this.focus('txtPais');
            global.Msg({msg: 'Required Field, Cod.Country'});
            return;
        }
        if (this.getValue("txtcodiva") === '') {
            this.focus('txtPais');
            global.Msg({msg: 'Required Field, Cod.IVA'});
            return;
        }

        this.beanMant.VP_OPCION = this.p.actionCode;
        this.beanMant.VP_PAIS = this.getValue("txtCountryName");
        this.beanMant.VP_CODPAIS = this.getValue("txtPais");
        this.beanMant.TYPEIVA = this.getValue("cmbTypeIva");
        this.beanMant.CODIVA = this.getValue("txtcodiva");
        this.beanMant.PORIVA = parseFloat(this.getValue("txtporcomi"));

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.mantenimientoIVA(this.beanMant);
                }
            }
        });
    },
    onUpdateClick: function (btn) {
        this.beanMant.VP_OPCION = this.p.actionCode;
        this.beanMant.CCUST = '139';
        this.beanMant.VP_CODPAIS = this.getValue("txtPais");
        this.beanMant.CODCNTRY = this.beanMant.VP_CODPAIS;
        this.beanMant.VP_PAIS = this.getValue("txtCountryName");
        this.beanMant.COUNTRY = this.beanMant.VP_PAIS;
        this.beanMant.SEQ = this.getValue("txtseq");
        this.beanMant.CODIVA = this.getValue("txtcodiva");
        this.beanMant.PORIVA = parseFloat(this.getValue("txtporcomi"));
        this.beanMant.TYPEIVA = this.getValue("cmbTypeIva");

        if (this.beanMant.PORIVA === 0) {
            this.focus('txtporcomi');
            global.Msg({msg: 'Required Field, Percent IVA'});
            return;
        }

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to update ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            animateTarget: btn,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.mantenimientoIVA(this.beanMant);
                }
            }
        });
    },
    onDeleteClick: function (btn) {
        this.beanMant.VP_OPCION = 'D';
        this.beanMant.VP_CODPAIS = this.getValue("txtPais");
        this.beanMant.VP_PAIS = this.getValue("txtCountryName");
        this.beanMant.SEQ = this.getValue("txtseq");
        this.beanMant.TYPEIVA = this.getValue("cmbTypeIva");

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            animateTarget: btn,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.mantenimientoIVA(this.beanMant);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>


    onSearchkeybusca: function (f, e) {
        var me = this;
        if (e.getKey() === e.ENTER) {
            me.beanMant.VP_OPCION = 'B';
            me.beanMant.VP_CODPAIS = Ext.getCmp(prototype.id + '-txtPais').getValue();
            me.busqueda='Y';
            if (me.beanMant.VP_CODPAIS === '') {
                this.focus('txtPais');
                global.Msg({msg: 'Required Field, Cod.Country'});
                return;
            }
            me.mantenimientoIVA(me.beanMant);
        }

    },
    //<editor-fold defaultstate="collapsed" desc="mantenimientoIVA">
    mantenimientoIVA: function (beanMant) {
        var me = this;
        Ext.Ajax.request({
            url: prototype.url + '/mantenimientoIVA',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanMant)},
            beforerequest: Ext.getCmp('DataEntryIvaForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryIvaForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    if (me.busqueda === '') {
                        Ext.Msg.show({
                            title: '.:PRAXIS:.',
                            msg: res.MESSAGE,
                            buttons: Ext.MessageBox.YES,
                            scope: this,
                            icon: Ext.MessageBox.INFO,
                            modal: true,
                            fn: function (btn) {
                                if (btn === 'yes') {
                                    if (res.SQLCODE === '0') {
                                        me.view.close();
                                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                    } else {
                                        me.afterRender();
                                    }
                                }
                            }
                        });
                    }
                    if (me.busqueda === 'Y') {
                        if (res.MESSAGE === 'ZZZ') {
                            me.setValue('txtCountryName', '');
                            global.Msg({msg: 'Country Code does not exists'});
                        } else {
                            me.setValue('txtCountryName', res.MESSAGE.trim());
                        }
                        me.busqueda = '';
                    }
                } else
                    global.Msg({msg: res.sesion});
                    global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryIvaForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
//            this.btnSearch_click();
        }
    }
    // </editor-fold>
});