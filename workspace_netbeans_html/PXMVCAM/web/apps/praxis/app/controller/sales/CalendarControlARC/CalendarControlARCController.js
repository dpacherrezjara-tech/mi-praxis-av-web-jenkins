
Ext.define('Ext.Praxis.controller.sales.CalendarControlARC.CalendarControlARCController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CalendarControlARCController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    _path: '',
    bean: {},
    beanExcel: {},
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'CalendarControlARCForm';
        prototype.url = CONTEXTPATH + '/CalendarControlARC';
        prototype.widthContenedor = 1100;
        // </editor-fold>
    },
    afterRender: function() {
        this.setValue('txtFilterDate', Ext.Date.format(new Date(), 'Y'));
        this.btnSearch_click();
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.bean.IN_A1527PPED = this.getValue("txtFilterDate");
        this.beanExcel.IN_A1527PPED = this.bean.IN_A1527PPED;
        this._path = prototype.url + '/getXLSX?IN_A1527PPED=' + this.beanExcel.IN_A1527PPED;
        this.search(this.bean);
    },
    btnFilter_click: function() {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    btnExcel_click: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    btnClear_click: function(obj, e) {
        this.setValue('txtFilterDate', '');
        if (Ext.getCmp(prototype.id + '-txtFilterDate').isVisible())
            this.focus('txtFilterDate');
    },
    btnBack_click: function() {
        global.showMenu();
    },
    // </editor-fold>

    search: function(bean) {
        console.log(bean);
        if (bean.IN_A1527PPED.trim() === '') {
            global.Msg({
                msg: 'Enter Year'
            });
        } else {
            Ext.Ajax.request({
                url: prototype.url + '/search',
                params: {
                    IN_A1527PPED: bean.IN_A1527PPED
                },
                beforerequest: Ext.getCmp(prototype.id + '-contenedor-calendario').mask('Loading...'),
                success: function(response, options) {
                    win.lblUser_toolTip("Estructura: A1527");
                    var res = Ext.JSON.decode(response.responseText);
                    res = res.data;
                    var panel = Ext.getCmp(prototype.id + '-contenedor-calendario');
                    var calendar = Ext.create('MtCalendar', {
                        fuente: 'ARC',
                        year: bean.IN_A1527PPED,
                        items: res,
                        listeners: {
                            onItemCalendarClick: function(qtr, month, week, op, commelw, commiap, commiar, cant, error, cantsale, cantelw, cantiap, cantiar, text) {
                                if (parseInt(text) <= parseInt(Ext.Date.format(new Date(), 'Ymd')) && op !== 'MONDAY' && op !== 'TUESDAY' && (cant !== 3 || error > 0) && cantsale < 3) {
                                    me.getRegularization(text, cantelw, cantiap, cantiar);
                                }
                            }
                        }
                    });
                    panel.removeAll();
                    panel.add(calendar);
                    Ext.getCmp(prototype.id + '-contenedor-calendario').unmask();
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                    Ext.getCmp(prototype.id + '-contenedor-calendario').unmask();
                }
            });
        }


    },
    getRegularization: function(fecha, cantelw, cantiap, cantiar) {
        var store_bank = Ext.create('Ext.data.ArrayStore', {
            storeId: 'theStore',
            autoLoad: false,
            data: [],
            fields: ['code', 'name']
        });
        store_bank.removeAll();
        if (cantelw == 0)
            store_bank.add({code: 'ELW', name: 'ELW'});
        if (cantiap == 0)
            store_bank.add({code: 'IAP', name: 'IAP'});
        if (cantiar == 0)
            store_bank.add({code: 'IAR', name: 'IAR'});
        var winRegularization = Ext.create('Ext.window.Window', {
            id: prototype.id + '-win-regularization',
            title: 'ARC - ' + fecha,
            header: true,
            bodyStyle: 'background: white',
            height: 200,
            width: 350,
            border: false,
            resizable: false,
            margin: 5,
            layout: {
                type: 'border'
            },
            modal: true,
            items: [
                {
                    region: 'center',
                    id: prototype.id + '-center2',
                    border: false,
                    padding: '5px 5px 5px 5px',
                    bbar: [
                        ' ',
                        {
                            xtype: 'button',
                            scale: 'medium',
                            iconCls: 'prx-icon-update',
                            text: 'Update',
                            height: 30,
                            listeners: {
                                beforerender: function(obj, opts) {
                                },
                                click: function(obj, e) {
                                    me.setRegularization(fecha);
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            scale: 'medium',
                            iconCls: 'prx-icon-cancel',
                            text: 'Cancel',
                            height: 30,
                            listeners: {
                                beforerender: function(obj, opts) {
                                },
                                click: function(obj, e) {
                                    Ext.getCmp(prototype.id + '-win-regularization').close();
                                }
                            }
                        }
                    ],
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'column',
                            border: false,
                            items: [
                                {
                                    columnWidth: 1, 
                                    border: false,
                                    padding: '0px 5px 0px 0px', 
                                    bodyStyle: 'background: transparent',
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Bank',
                                            id: prototype.id + '-Bank',
                                            store: store_bank,
                                            labelAlign: 'left',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: 'Select',
                                            labelWidth: 45,
                                            width: '150',
                                            anchor: '100%',
                                            listeners: {
                                                afterrender: function(obj) {
                                                    //obj.setValue('');
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            layout: 'column', border: false,
                            items: [
                                {
                                    columnWidth: 1, border: false,
                                    padding: '0px 5px 0px 0px', bodyStyle: 'background: transparent',
                                    items: [
                                        {
                                            xtype: 'label',
                                            html: '<strong>Reason for Regularize:</strong>'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            layout: 'column', border: false,
                            items: [
                                {
                                    columnWidth: 1, border: false,
                                    padding: '0px 5px 0px 0px', bodyStyle: 'background: transparent',
                                    items: [
                                        {
                                            xtype: 'textarea',
                                            id: prototype.id + '-Reason',
                                            width: '100%',
                                            anchor: '100%'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: function(obj, e) {
                },
                beforeclose: function(panel, e) {
                }
            }
        }).show();
    },
    setRegularization: function(fecha) {
        var IN_A1698BANK = Ext.getCmp(prototype.id + '-Bank').getValue();
        var IN_A1698COMEN = Ext.getCmp(prototype.id + '-Reason').getValue();
        if (IN_A1698BANK == '' || IN_A1698BANK == null) {
            Ext.MessageBox.alert('SISTEMA', "You must select a bank", function(btn, text) {
                if (btn == 'ok' || btn == 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-Bank').focus();", 100);
            });
            return;
        }
        if (IN_A1698COMEN == '') {
            Ext.MessageBox.alert('SISTEMA', "You must enter a reason", function(btn, text) {
                if (btn == 'ok' || btn == 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-Reason').focus();", 100);
            });
            return;
        }
        var data = {IN_A1527PPED: '', IN_A1527PDIDC: '', IN_A1527SODA: fecha, IN_A1698BANK: IN_A1698BANK, IN_A1698COMEN: IN_A1698COMEN};
        global.Msg({
            msg: 'Want to regularize this date ' + fecha + '?',
            icon: 3,
            buttons: 3,
            fn: function(btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: prototype.url + '/updateObservation',
                        params: data,
                        success: function(response, options) {
                            var res = Ext.decode(response.responseText);
                            Ext.getCmp(prototype.id + '-win-regularization').close();
                            me.search(me.bean);
                        }
                    });
                }
            }
        });
    },
    exportExcel: function() {
        if (this._path.length > 0)
            global.getFile(this._path);
    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});
