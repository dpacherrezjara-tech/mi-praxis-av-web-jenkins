/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.FareBasis.FareBasisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FareBasisController',
    fecha: new Date(),
    searchParams: {},
    init: function(view) {
        console.log('1)  APPLICATION FareBasisFormController  - CONTROLLER FareBasisFormController - INIT');
        prototype.id = 'FareBasisForm';
        prototype.url = CONTEXTPATH + '/FareBasis';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#FareBasisForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#FareBasisForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#FareBasisForm-btnClear': {
                click: this.btnClear_click
            },
            '#FareBasisForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#FareBasisForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#FareBasisForm-btnBack': {
                click: this.btnBack_click
            },
            '#FareBasisForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#FareBasisForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#FareBasisForm-btn-pag-next': {
                click: this.pagNext
            },
            '#FareBasisForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#FareBasisForm-cmbSearchType': {
                select: this.selectcmbSearchType
            },
            '#FareBasisForm-txtCampo': {
                keyup: this.eventKey,
                change: this.onUpperValue

            },
            '#FareBasisForm-txtCamp2': {
                keyup: this.eventKey,
                change: this.onUpperValue

            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        Ext.getCmp(prototype.id + '-cmbSearchType').setValue("1");
        Ext.getCmp(prototype.id + '-txtCampo').show();
        Ext.getCmp(prototype.id + '-txtCamp2').show();
        this.btnSearch_click();
    },
    selectcmbSearchType: function(obj) {

        var opt = obj.getValue();
        switch (opt) {
            case '':
                Ext.getCmp(prototype.id + '-txtCampo').hide();
                Ext.getCmp(prototype.id + '-txtCamp2').hide();
                break;

            case '1':
                Ext.getCmp(prototype.id + '-txtCampo').show();
                Ext.getCmp(prototype.id + '-txtCamp2').show();
                break

            case '2':
                Ext.getCmp(prototype.id + '-txtCampo').hide();
                Ext.getCmp(prototype.id + '-txtCamp2').show();
                break;
        }

    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function() {
        var cmbSearch = Ext.getCmp(prototype.id + '-cmbSearchType');
        cmbSearch.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Selected"],
                ["1", "Cia + FBasis"],
                ["2", "FareBasis"]
            ]
        }));
    }
    ,
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {

        var IN_OPCION = Ext.getCmp(prototype.id + '-cmbSearchType').getValue();
        var IN_AIRLIN = Ext.getCmp(prototype.id + '-txtCampo').getValue();
        var IN_FBASIS = Ext.getCmp(prototype.id + '-txtCamp2').getValue();



        searchParams = {
            IN_OPCION: IN_OPCION,
            IN_AIRLIN: IN_AIRLIN,
            IN_FBASIS: IN_FBASIS
        };
        console.log("IN_OPCION : " + IN_OPCION);
        console.log("IN_AIRLIN : " + IN_AIRLIN);
        console.log("IN_FBASIS : " + IN_FBASIS);

    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.FareBasis.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
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
    eventKey: function(e, eOpts) {

        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    }
    ,
    btnClear_click: function(obj, e) {


        Ext.getCmp(prototype.id + '-cmbSearchType').setValue("1");
        Ext.getCmp(prototype.id + '-txtCampo').show();
        Ext.getCmp(prototype.id + '-txtCamp2').show();
        Ext.getCmp(prototype.id + '-txtCampo').setValue('');
        Ext.getCmp(prototype.id + '-txtCamp2').setValue('');

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
                    this.ValidationDownloadExcel();
                }
            }
        });
    },
   
    exportExcel: function() {
        this.setParams();
        global.getFile(prototype.url + '/getXLSX?IN_OPCION=' + searchParams.IN_OPCION + '&IN_AIRLIN=' + searchParams.IN_AIRLIN + '&IN_FBASIS=' + searchParams.IN_FBASIS);
    }
    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    ValidationDownloadExcel: function (rec) {
        this.setParams();
        var me = this;
        Ext.Ajax.request({
            url: prototype.url + '/ValidationDownload',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                IN_OPCION: searchParams.IN_OPCION,
                IN_AIRLIN: searchParams.IN_AIRLIN,
                IN_FBASIS: searchParams.IN_FBASIS
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
    /**
     * Metodos usados para el CRUD
     * */


    btnAdd_click: function(obj, e) {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);
    },
    winDataEntry: function(action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        all = all === null || all === undefined ? {} : all;
        rowIndex = rowIndex === null || rowIndex === undefined ? {} : rowIndex;

        Ext.create('Ext.Praxis.view.sales.FareBasisForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                all: all,
                rowIndex: rowIndex
            }
        }).show();

    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();

    },
    pagLast: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    },
    btnBack_click: function(obj, e) {
       global.showMenu();
    }
});
