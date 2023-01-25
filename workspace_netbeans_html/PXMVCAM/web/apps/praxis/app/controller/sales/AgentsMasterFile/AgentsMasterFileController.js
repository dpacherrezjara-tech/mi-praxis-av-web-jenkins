/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.AgentsMasterFile.AgentsMasterFileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AgentsMasterFileController',
    fecha: new Date(),
    searchParams: {},
    init: function (view) {
        prototype.id = 'AgentsMasterFileForm';
        prototype.url = CONTEXTPATH + '/AgentsMasterFile';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#AgentsMasterFileForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#AgentsMasterFileForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AgentsMasterFileForm-btnClear': {
                click: this.btnClear_click
            },
            '#AgentsMasterFileForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AgentsMasterFileForm-btnTxt': {
                click: this.btnTxt_click
            },
            '#AgentsMasterFileForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#AgentsMasterFileForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#AgentsMasterFileForm-btnBack': {
                click: this.btnBack_click
            },
            '#AgentsMasterFileForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AgentsMasterFileForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AgentsMasterFileForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AgentsMasterFileForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#AgentsMasterFileForm-cmbSearchType': {
                select: this.selectcmbSearchType
            },
            '#AgentsMasterFileForm-cmbSearchBy': {
                select: this.selectcmbSearchBy
            },
            '#AgentsMasterFileForm-txtSearchBy': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#AgentsMasterFileForm-txtSearchType': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }

        });
    },
    OnBeforeShow: function () {
        prototype.id = 'AgentsMasterFileForm';
        prototype.url = CONTEXTPATH + '/AgentsMasterFile';

    },
    xpanel_afterrender: function (obj, e) {
        this.setStoreData();
        Ext.getCmp(prototype.id + '-cmbSearchType').hide();
        Ext.getCmp(prototype.id + '-cmbSearchBy').setValue("");
        Ext.getCmp(prototype.id + '-cmbSearchType').setValue("");
        Ext.getCmp(prototype.id + '-txtSearchBy').hide();
        Ext.getCmp(prototype.id + '-txtSearchType').hide();
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
        Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue("");
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue("");
        this.btnSearch_click();
    },
    selectcmbSearchBy: function (obj) {
        Ext.getCmp(prototype.id + '-txtSearchBy').setValue("");
        Ext.getCmp(prototype.id + '-txtSearchType').setValue("");
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue("");
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue("");
        var opt = obj.getValue();
        switch (opt) {
            case '1':
                Ext.getCmp(prototype.id + '-cmbSearchType').hide();
                Ext.getCmp(prototype.id + '-txtSearchBy').show();
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();
                Ext.getCmp(prototype.id + '-txtSearchBy').inputEl.dom.maxLength = 10;
                //textfield.inputEl.dom.maxLength += 2;

                Ext.getCmp(prototype.id + '-txtSearchBy').setFieldLabel("Agente Code");
                Ext.getCmp(prototype.id + '-txtSearchType').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-cmbSearchType').hide();
                Ext.getCmp(prototype.id + '-txtSearchBy').show();
                Ext.getCmp(prototype.id + '-txtSearchBy').inputEl.dom.maxLength = 30;
                Ext.getCmp(prototype.id + '-txtSearchBy').setFieldLabel("Legal Name");
                Ext.getCmp(prototype.id + '-txtSearchType').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();

                break;
            case '3':
                Ext.getCmp(prototype.id + '-cmbSearchType').show();
                Ext.getCmp(prototype.id + '-cmbSearchType').setValue("BSP");
                Ext.getCmp(prototype.id + '-txtSearchBy').hide();
                Ext.getCmp(prototype.id + '-txtSearchType').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();
                break;
            case '4':
                Ext.getCmp(prototype.id + '-cmbSearchType').show();
                Ext.getCmp(prototype.id + '-cmbSearchType').setValue("BSP");
                Ext.getCmp(prototype.id + '-txtSearchBy').show();
                Ext.getCmp(prototype.id + '-txtSearchBy').inputEl.dom.maxLength = 2;
                Ext.getCmp(prototype.id + '-txtSearchBy').setFieldLabel("Country Code");
                Ext.getCmp(prototype.id + '-txtSearchType').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();
                break;
            case '5':
                Ext.getCmp(prototype.id + '-cmbSearchType').show();
                Ext.getCmp(prototype.id + '-cmbSearchType').setValue("BSP");
                Ext.getCmp(prototype.id + '-txtSearchBy').show();
                Ext.getCmp(prototype.id + '-txtSearchBy').inputEl.dom.maxLength = 3;
                Ext.getCmp(prototype.id + '-txtSearchBy').setFieldLabel("City Code");
                Ext.getCmp(prototype.id + '-txtSearchType').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();
                break;
            case '6':
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').show();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').show();
                Ext.getCmp(prototype.id + '-txtSearchBy').show();
                Ext.getCmp(prototype.id + '-cmbSearchType').hide();
                Ext.getCmp(prototype.id + '-txtSearchBy').inputEl.dom.maxLength = 10;

                Ext.getCmp(prototype.id + '-txtSearchBy').setFieldLabel("Agente Code");
                Ext.getCmp(prototype.id + '-txtSearchType').hide();
                break;
            default:
                Ext.getCmp(prototype.id + '-cmbSearchType').hide();
                Ext.getCmp(prototype.id + '-cmbSearchBy').setValue("");
                Ext.getCmp(prototype.id + '-cmbSearchType').setValue("");
                Ext.getCmp(prototype.id + '-txtSearchBy').hide();
                Ext.getCmp(prototype.id + '-txtSearchType').hide();

        }

    },
    selectcmbSearchType: function (obj) {

        var opt = obj.getValue();
        switch (opt) {
            case 'BSP':
                Ext.getCmp(prototype.id + '-txtSearchType').hide();
                break;
            case 'ASR':
                Ext.getCmp(prototype.id + '-txtSearchType').show();
                break;
            case 'ARC':
                Ext.getCmp(prototype.id + '-txtSearchType').hide();
                break;

        }

    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function () {



        var cmbSearch = Ext.getCmp(prototype.id + '-cmbSearchBy');
        cmbSearch.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["1", "Agent"],
                ["2", "Legal Name"],
                ["3", "Type"],
                ["4", "Country Code"],
                ["5", "City Code"],
                ["6", "Automatic"]
            ]
        }));

        var cmbSearchType = Ext.getCmp(prototype.id + '-cmbSearchType');
        cmbSearchType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["BSP", "BSP"],
                ["ARC", "ARC"],
                ["ASR", "ASR"]

            ]
        }));
    }
    ,
    btnSearch_click: function (obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function () {

        var cmbSearchType = Ext.getCmp(prototype.id + '-cmbSearchType').getValue();
        var cmbSearchBy = Ext.getCmp(prototype.id + '-cmbSearchBy').getValue();
        var textSearchBy = Ext.getCmp(prototype.id + '-txtSearchBy').getValue();
        var textSearchType = Ext.getCmp(prototype.id + '-txtSearchType').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();


        if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {

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
        }

        var VP_ACTION = cmbSearchBy;
        var A003KEY1;
        var A003KEY2;
        var A003KEY3;


        switch (VP_ACTION) {
            case '1':
                A003KEY1 = textSearchBy;
                A003KEY2 = '';
                A003KEY3 = '';
                break;
            case '2':
                A003KEY1 = '';
                A003KEY2 = '';
                A003KEY3 = textSearchBy;

                break;
            case '3':
                A003KEY1 = '';
                A003KEY2 = cmbSearchType;
                A003KEY3 = textSearchType;
                break;
            case '4':
                A003KEY1 = textSearchBy.trim();
                A003KEY2 = cmbSearchType;
                A003KEY3 = textSearchType.trim();
                break;
            case '5':
                A003KEY1 = textSearchBy.trim();
                A003KEY2 = cmbSearchType;
                A003KEY3 = textSearchType.trim();
                break;
            case '6':
                A003KEY1 = textSearchBy;
                A003KEY2 = "";
                A003KEY3 = txtFilterDateFrom.replace('/', '') + "" + txtFilterDateTo.replace('/', '');
                //A003KEY3: 201911/28201912/05
                break;
            default:
                A003KEY1 = '';
                A003KEY2 = '';
                A003KEY3 = '';

        }
        if (VP_ACTION === '6') {
            A003KEY3 = A003KEY3.replace('/', '');
        }

        searchParams = {
            VP_ACTION: VP_ACTION,
            A003KEY1: A003KEY1,
            A003KEY2: A003KEY2,
            A003KEY3: A003KEY3

        };

//        console.log("VP_ACTION : " + VP_ACTION);
//        console.log("A003KEY1 : " + A003KEY1);
//        console.log("A003KEY2 : " + A003KEY2);
//        console.log("A003KEY3 : " + A003KEY3);

    },
    setGridData: function (obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.AgentsMasterFile.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    eventKey: function (e, eOpts) {

        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    }
    ,
    btnClear_click: function (obj, e) {

        Ext.getCmp(prototype.id + '-cmbSearchBy').setValue('');
        Ext.getCmp(prototype.id + '-txtSearchBy').setValue('');
        Ext.getCmp(prototype.id + '-txtSearchType').setValue('');

    },
    btnExcel_click: function (obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.validationDownloadExcel();
                }
            }
        });
    },
    validationDownloadExcel: function (rec) {
        this.setParams();
        var me = this;
        Ext.Ajax.request({
            url: prototype.url + '/ValidationDownload',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                VP_ACTION: searchParams.VP_ACTION,
                A003KEY1: searchParams.A003KEY1,
                A003KEY2: searchParams.A003KEY2,
                A003KEY3: searchParams.A003KEY3
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var int_result = res.int_result;
                if(int_result>100000)
                {
                     global.Msg({
                            msg: 'Report cannot be exported, please contact system administrator.'
                        });
                }
                else
                {
                    me.exportExcel();
                }
                Ext.getBody().unmask();
            }
        });
    },
    exportExcel: function () {
        this.setParams();
        var VP_A003TYPE = 'xlsx';
        global.getFile(prototype.url + '/getFileTxt?VP_ACTION=' + searchParams.VP_ACTION + '&A003KEY1=' + searchParams.A003KEY1 + '&A003KEY2=' + searchParams.A003KEY2 + '&A003KEY3=' + searchParams.A003KEY3 + '&A003TYPE=' + VP_A003TYPE);
    },
    btnTxt_click: function (obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Plain Text File ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.validationDownloadTxt();
                }
                Ext.getBody().unmask();
            }
        });
    },
    exportTxt: function (rec) {
        this.setParams();
        var VP_A003TYPE = 'txt';
        global.getFile(prototype.url + '/getFileTxt?VP_ACTION=' + searchParams.VP_ACTION + '&A003KEY1=' + searchParams.A003KEY1 + '&A003KEY2=' + searchParams.A003KEY2 + '&A003KEY3=' + searchParams.A003KEY3 + '&A003TYPE=' + VP_A003TYPE);
    },

    
    validationDownloadTxt: function (rec) {
        this.setParams();
        var me = this;
        Ext.Ajax.request({
            url: prototype.url + '/ValidationDownload',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                VP_ACTION: searchParams.VP_ACTION,
                A003KEY1: searchParams.A003KEY1,
                A003KEY2: searchParams.A003KEY2,
                A003KEY3: searchParams.A003KEY3
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var int_result = res.int_result;
                if(int_result>100000)
                {
                     global.Msg({
                            msg: 'Report cannot be exported, please contact system administrator.'
                        });
                }
                else
                {
                    me.exportTxt();
                }
                Ext.getBody().unmask();
            }
        });
    },
    
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    /**
     * Metodos usados para el CRUD
     * */
    btnAdd_click: function (obj, e) {
        this.winDataEntry('I');
    },
    onEditClick: function (grid, rowIndex, colIndex) {

        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);


//        var rec = grid.getStore().getAt(rowIndex);
//        var all = grid.getStore();
//        var data = rec.data;
//
//        Ext.Ajax.request({
//            url: prototype.url + '/searchCompData',
//            method: 'POST',
//            timeout: 60000000,
//            beforerequest: Ext.getBody().mask('Loading...'),
//            params: {
//                A003KEY: data.A003KEY
//
//            },
//            success: function(response, options) {
//                var res = Ext.JSON.decode(response.responseText);
//                var ciudades = res.dataCity;
//                var paises = res.dataPaises;
//
//                res = res.data;
//                Ext.create('Ext.Praxis.view.sales.AgentsMasterFileForm.DataEntry', {
//                    id: prototype.id + '-dataEntry',
//                    params: {
//                        action: 'U',
//                        data: res,
//                        ciudades: ciudades,
//                        paises: paises
//                    }
//                }).show();
//                Ext.getBody().unmask();
//            }
//        });

    },

    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        var data = rec.data;
        var A003KEY;
        if (action === 'U') {
            A003KEY = data.A003KEY;
        } else {
            A003KEY = "";
        }


        Ext.Ajax.request({
            url: prototype.url + '/searchCompData',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                A003KEY: A003KEY,
                action: action
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var ciudades = res.dataCity;
                var paises = res.dataPaises;
                var data = res.data;

                Ext.create('Ext.Praxis.view.sales.AgentsMasterFileForm.DataEntry', {
                    id: prototype.id + '-dataEntry',
                    params: {
                        action: action,
                        data: data,
                        ciudades: ciudades,
                        paises: paises
                    }
                }).show();
                Ext.getBody().unmask();
            }
        });

    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();

    },
    pagLast: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    }
    ,
    btnBack_click: function (obj, e) {
        var heightMenu = 400;
        Ext.getCmp('App-main' + '-region-content-north').setHeight(heightMenu);
    }
});
