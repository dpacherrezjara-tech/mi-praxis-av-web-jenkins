
Ext.define('Ext.Praxis.controller.salesaudit.ControlBsplinkForm.ControlBsplinkFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ControlBsplinkFormController',

    beanTMP: {},
    beandetal: {},
    beanEXCEL: {},
    beanupdate: {},
    /**
     * Constructor
     */

    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        //alert('Controlador cargado correctamente')
        this.setStoresFilters();
        this.setStoresGrids();

        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },

    OnBeforeShow: function () {
        prototype.id = 'ControlBsplinkForm';
        prototype.url = CONTEXTPATH + '/ControlBsplinkForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },

    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-cbxFiltro');
        var cmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "1", "name": "USER"}
                //{"code": "2", "name": "SYSTEM DATE"}
            ]
        }));

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "0", "name": "ENABLED"},
                {"code": "1", "name": "DISABLED"}
            ]
        }));

        cmbSearch.setValue('');
        cmbStatus.setValue('');
    },

    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id + '-gridData');
        var grid02 = Ext.getCmp(prototype.id + '-gridDetalle');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid01',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchBSPLINK',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid01.setStore(store01);
        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store01);

        var store02 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchBSPLINK/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }//,
            //autoLoad: true,
            //pageSize: 25
        });
        grid02.setStore(store02);
        // Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
    },

    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
            Ext.getCmp(prototype.id + '-pagginator-legend').hide();
        } else {
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
            Ext.getCmp(prototype.id + '-pagginator-legend').show();
        }
    },

    onPagingBeforeChange01: function (obj, page, opts) {
        obj.store.proxy.extraParams = this.beanTMP;
    },

    OnColumnStatusRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        if (String(record.get('A3093FLAG')) == 'Activo') {
            value = 'green';
        } else {
            value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onSearchClick: function (btn) {
        var me = this;

        var cbxFiltro = String(Ext.getCmp(prototype.id + '-cbxFiltro').getValue());
        //var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        //var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var txtcountry = Ext.getCmp(prototype.id + '-country').getValue();
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus').getValue();

        /*if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {
         
         if (global.existeFecha(txtFilterDateFrom) !== '') {
         Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateFrom), function (btn, text) {
         if (btn === 'ok' || btn === 'cancel')
         setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
         });
         return;
         }
         
         if (global.existeFecha(txtFilterDateTo) !== '') {
         Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
         if (btn === 'ok' || btn === 'cancel')
         setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
         });
         return;
         }
         if (Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue()) > Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue())) {
         Ext.MessageBox.alert('PRAXIS', "the starting date must be less than the end date", function (btn, text) {
         if (btn === 'ok' || btn === 'cancel')
         setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
         });
         return;
         }
         }*/

        this.beanTMP.VP_OPTION = cbxFiltro;
        this.beanTMP.VP_COUNTRY = txtcountry;
        this.beanTMP.VP_DATE1 = 'P';
        this.beanTMP.VP_DETE2 = '';
        this.beanTMP.VP_FLAG = CmbStatus;

        /*
         * El valor obtenido del checkbox se interpreta de forma inversa para 
         * aprovechar el uso de la variable bexcel
         */
        this.beanTMP.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;

        // console.log(this.beanTMP);
        if (btn !== true) {
            Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
        }
        var grid01 = Ext.getCmp(prototype.id + '-gridData');
        var store01 = grid01.getStore();

        store01.loadPage(1, {
            params: this.beanTMP,
            callback: function (records, operation, success) {

            }
        });

    },

    onRendererColumDescription: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onEditActionColumnClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },

    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'I' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.ControlBsplinkForm.DataEntryControlBsplinkForm({
            params: {
                action: action,
                rec: rec,
                url01: prototype.url
            }
        });
        win.show();
    },

    onAddClick: function (obj) {
        this.winDataEntry('I', {});
    },

    OnEditActionDisabled: function (view, rowIndex, colIndex, item, record) {
        return false;
    },
    onExcelClick: function () {
        var me = this;
        var cbxFiltro = String(Ext.getCmp(prototype.id + '-cbxFiltro').getValue());
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var txtcountry = Ext.getCmp(prototype.id + '-country').getValue();
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        me.beanEXCEL.VP_OPTION = cbxFiltro;
        me.beanEXCEL.VP_COUNTRY = txtcountry;
        me.beanEXCEL.VP_DATE1 = txtFilterDateFrom;
        me.beanEXCEL.VP_DETE2 = txtFilterDateTo;
        me.beanEXCEL.VP_FLAG = CmbStatus;

        if (Ext.Object.getSize(me.beanEXCEL) > 0) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(me.beanEXCEL)));
                    }
                }
            });
        }
    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var txtDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');
        var txtcountry = Ext.getCmp(prototype.id + '-country');
        if (obj.getValue() === "1") {
            txtDateFrom.hide();
            txtFilterDateTo.hide();
            txtcountry.show();
            ///---
            txtDateFrom.setValue('');
            txtFilterDateTo.setValue('');

        } else if (obj.getValue() === "2") {
            txtDateFrom.show();
            txtFilterDateTo.show();
            txtcountry.hide();
            //
            txtcountry.setValue('');
        } else {
            txtDateFrom.hide();
            txtFilterDateTo.hide();
            txtcountry.hide();
            //
            txtDateFrom.setValue('');
            txtFilterDateTo.setValue('');
            txtcountry.setValue('');
        }


    },
    onRendererColumnOnPais: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_detalle(' + rowIndex + ');">' + value + '</span>'
    },
    searchform_detalle: function (rowIndex) {
        var grid = Ext.getCmp(prototype.id + '-gridData');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        Ext.getCmp(prototype.id + '-gridData').setVisible(false);
        Ext.getCmp(prototype.id + '-lbl-total').setVisible(false);

        Ext.getCmp(prototype.id + '-gridDetalle').setVisible(true);
        Ext.getCmp(prototype.id + '-lbl-totalDeta').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-back').setVisible(true);
        ///CARGANDO EL DETALLE DE LA GRTILLA 
        this.beandetal.VP_OPTION = '1';
        this.beandetal.VP_COUNTRY = '';//rec.data.A3093USER;
        this.beandetal.VP_DATE1 = 'S';
        this.beandetal.VP_DETE2 = rec.data.A3093CUENT;
        this.beandetal.VP_FLAG = CmbStatus;
        this.beandetal.pexcel = 1;


        Ext.getCmp(prototype.id + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDetalle').getStore().loadPage(1, {
            params: this.beandetal,
            callback: function (records, operation, success) {
                
                if (records.length !== 0) {
                    Ext.getCmp(prototype.id + '-lbl-totalDeta').setText(records.length);
                } else {
                    Ext.getCmp(prototype.id + '-lbl-totalDeta').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }
                //Ext.getCmp(prototype.id + '-country').setValue(records[0].data.A3388TOTALPAG);

            }
        });
    },
    onBackClick: function (obj, e) {
        Ext.getCmp(prototype.id + '-gridData').setVisible(true);
        Ext.getCmp(prototype.id + '-lbl-total').setVisible(true);

        Ext.getCmp(prototype.id + '-lbl-total').setText('0');
        Ext.getCmp(prototype.id + '-gridDetalle').setVisible(false);
        Ext.getCmp(prototype.id + '-lbl-totalDeta').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-back').setVisible(false);
    },
    onDeleteClick: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        me.beanupdate.VP_OPTION = 'D';
        me.beanupdate.A3093PAIS = rec.get('A3093PAIS');
        me.beanupdate.A3093USER = '';
        me.beanupdate.A3093PASS = '';
        me.beanupdate.A3093CORRL = rec.get('A3093CORRL');



        if (me.beanupdate.A3093CORRL.length !== '') {
            global.Msg({
                msg: 'DEACTIVATE  RECORD?',
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id + '-Contenedor'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: prototype.url + '/ProcesaMantenimiento/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanupdate)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                //console.log(res.data);
                                var vp_icon = 0;
                                if (res.data === 'RECORD DEACTIVATE') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.id + '-gridDetalle').getStore().removeAll();
                                            Ext.getCmp(prototype.id + '-gridDetalle').getStore().loadPage(1, {
                                                params: this.beandetal,
                                                callback: function (records, operation, success) {
                                                    if (records.length !== 0) {
                                                        Ext.getCmp(prototype.id + '-lbl-totalDeta').setText(records[0].data.total);
                                                    } else {
                                                        Ext.getCmp(prototype.id + '-lbl-totalDeta').setText('0');
                                                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                                                            }});

                                                    }
                                                    //Ext.getCmp(prototype.id + '-country').setValue(records[0].data.A3388TOTALPAG);

                                                }
                                            });

                                        }


                                    }});
                            }
                        });
                    }

                }
            });

        } else {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one record');
            return;
        }
        //rec.get('A2548FLAG'),
    }

});


