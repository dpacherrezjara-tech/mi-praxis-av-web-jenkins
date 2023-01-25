/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : SSIMComplementaryFilesController                  *                          
 * Created on : 15/02/2018, 16:41:15                              *               
 * Author     : Gregory Sánchez (gsanchez)                        *           
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 20-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

Ext.define('Ext.Praxis.controller.flown.SSIMComplementaryFiles.SSIMComplementaryFilesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SSIMComplementaryFilesController',
    searchParams: {},
    beanTMP: {},
    me: '',
    setContext: function() {
        me = this;
    },
    init: function() {
        prototype.id = 'SSIMComplementaryFilesForm';
        prototype.id01 = 'DataEntrySSIMComplementaryFilesForm';
        prototype.url = CONTEXTPATH + '/SSIMComplementaryFiles';
        this.control({
            '#SSIMComplementaryFilesForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#SSIMComplementaryFilesForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#SSIMComplementaryFilesForm-btn-pag-next': {
                click: this.pagNext
            },
            '#SSIMComplementaryFilesForm-btn-pag-last': {
                click: this.pagLast
            }
        });
    },
    onDisplayClick: function() {
        global.Msg({
            msg: 'Option not available.'
        });
    },
    afterRender: function() {
        this.onSearchClick();
    },
    setParametros: function() {
        var NFLIGHT = Ext.getCmp(prototype.id + '-search-text').getValue();

        searchParams = {
            NFLIGHT: NFLIGHT
        };
    },
    onSearchClick: function(obj, val) {
        this.setParametros();

        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.SSIMComplementaryFiles.GridData', {
            proxy: {
                url: prototype.url + '/cargarPX104'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
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
    onFilterClick: function() {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.setVisible(false);
        else
            option.setVisible(true);
    },
    onClearClick: function(btn) {
        Ext.getCmp(prototype.id + '-search-text').setValue('');
        Ext.getCmp(prototype.id + '-search-text').focus();
    },
    winDataEntry: function(action, rec) {
        action = action == null || action == undefined ? 'I' : action;
        rec = rec == null || rec == undefined ? {} : rec;
        var win = new Ext.Praxis.view.flown.SSIMComplementaryFilesForm.DataEntry({
            params: {
                action: action,
                rec: rec
            }
        });
        win.show();
    },
    onAddClick: function(btn) {
        this.winDataEntry();
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    onSearchTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() == e.ENTER) {
            this.onSearchClick();
        }
    },
    onExcelClick: function() {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel?',
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
    exportExcel: function() {
        var NFLIGHT = Ext.getCmp(prototype.id + '-search-text').getValue();
        var strDomain = prototype.url + '/getXLSX?NFLIGHT=' + NFLIGHT;

        global.getFile(strDomain);
    },
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
    }
});