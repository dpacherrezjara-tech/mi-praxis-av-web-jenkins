Ext.define('Ext.Praxis.controller.payments.DuplicateSettlements.DuplicateSettlementsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DuplicateSettlementsController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanDelete: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    reg99: 0,
    error: '',
    Fuente: '',
    me: '',
    searchParams: {},
    lstSettlement: [],
    paramsDetail: {},
    dataObtain: {},
    lst: [],
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'DuplicateSettlementsForm';
        prototype.url = CONTEXTPATH + '/DuplicateSettlements';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#DuplicateSettlementsForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#DuplicateSettlementsForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#DuplicateSettlementsForm-btnClear': {
                click: this.btnClear_click
            },
            '#DuplicateSettlementsForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#DuplicateSettlementsForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#DuplicateSettlementsForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#DuplicateSettlementsForm-btnBack': {
                click: this.btnBack_click
            },
            '#DuplicateSettlementsForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#DuplicateSettlementsForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#DuplicateSettlementsForm-btn-pag-next': {
                click: this.pagNext
            },
            '#DuplicateSettlementsForm-btn-pag-last': {
                click: this.pagLast
            },
            '#DuplicateSettlementsForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth
            },
            '#DuplicateSettlementsForm-cmbYear': {
                afterrender: this.afterRenderYear
            },
             '#DuplicateSettlementsForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
             '#DuplicateSettlementsForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
             '#DuplicateSettlementsForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
        });
    },
    xpanel_afterrender: function (obj, e) {
        
        $('#DuplicateSettlementsForm-btnToggleSwitchTACA').on('change', function () {
            console.log("ME ACTIVO");
            me.lstSettlement = [];
            var isChecked = $(this).find('input[type=checkbox]').prop('checked'); 
            var panelMain = Ext.getCmp(prototype.id + '-panelGridData');
            var panelMainDelete = Ext.getCmp(prototype.id + '-panelGridDataDeleted');
            
            var buttonDeletedAll = Ext.getCmp(prototype.id + '-btn_AllInfo');
            var buttonDeletedSelected = Ext.getCmp(prototype.id + '-btn_SelectAllInfo');
            var buttonReverseAll = Ext.getCmp(prototype.id + '-btn_AllInfoReverse');
            var buttonReverseSelected = Ext.getCmp(prototype.id + '-btn_SelectAllInfoReverse');
            console.log(isChecked,'isChecked')
            if (isChecked) {
                console.log("MUESTRO SECUNDARIO");
                me.panelActual = "-panelGridDataDeleted"; // asigno al eliminado
                panelMainDelete.setVisible(true);
                panelMain.setVisible(false);
                
                buttonDeletedAll.setVisible(false);
                buttonDeletedSelected.setVisible(false);
                buttonReverseAll.setVisible(true);
                buttonReverseSelected.setVisible(true);
            } else {
                console.log("MUESTRO PRINCIPAL");
                me.panelActual = "-panelGridData"; // asigno al principal
                panelMainDelete.setVisible(false);
                panelMain.setVisible(true);
                
                buttonDeletedAll.setVisible(true);
                buttonDeletedSelected.setVisible(true);
                buttonReverseAll.setVisible(false);
                buttonReverseSelected.setVisible(false);
            }

            me.btnSearch_click();
        });

        this.obtainData();
        this.btnSearch_click();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    filterINPName: function (e, eOpts) {
        switch (eOpts.getKey()) {
            case 13:
                this.btnSearch_click();
        }
    },
    obtainData: function () {
        
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 4);

        var month = yesterday.getMonth() + 1;
        var day = yesterday.getDate();
        var year = yesterday.getFullYear();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        var storeComboDataYear = me.getStoreYearBank(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(year);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);
        
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(year);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);
        
        var cmbNEGOC = Ext.getCmp(prototype.id + '-cmbNEGOC');
        cmbNEGOC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                
                ["1", "PASAJES"],
                ["2", "CARGO"],
                ["3", "CORREO"],
                ["S", "STANDBY"],
            ]
        }));
        cmbNEGOC.setValue("1");
        
        var cmbSTATUS = Ext.getCmp(prototype.id + '-cmbSTATUS');
        cmbSTATUS.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['value', 'description'],
            data: [
                ["1", "Match"],
                ["3", "Settlement Without Sales"],
                ["S", "Match Manual"],
            ]
        }));
        cmbSTATUS.setValue("3");
        
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify({CARD: 2})
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-cmbCARDTYPE').bindStore(
                        Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true})
                    );
                    win.setValue('cmbCARDTYPE', '');
                } else
                    global.clear();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    setFormatParameter: function () {

        me.bean = {};

       me.bean.IN_FECHA_FROM = 
            (Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue() || '');

        me.bean.IN_FECHA_TO = 
            (Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() || '');

        me.bean.IN_CCUST = Ext.getCmp(prototype.id + '-typeClient').getValue() || '';
        me.bean.IN_CODEBANK = Ext.getCmp(prototype.id + '-txtCodeBank').getValue() || '';
        me.bean.IN_NEGOC = Ext.getCmp(prototype.id + '-cmbNEGOC').getValue() || '';
        me.bean.IN_SCARCOD = Ext.getCmp(prototype.id + '-cmbCARDTYPE').getValue() || '';
        me.bean.IN_STATUS = Ext.getCmp(prototype.id + '-cmbSTATUS').getValue() || '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
    },
    setFormatParameterDelete: function () {

        me.bean = {};

       me.bean.IN_FECHA_FROM = 
            (Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue() || '');

        me.bean.IN_FECHA_TO = 
            (Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() || '');

        me.bean.IN_CCUST = '999';
        me.bean.IN_CODEBANK = Ext.getCmp(prototype.id + '-txtCodeBank').getValue() || '';
        me.bean.IN_NEGOC = Ext.getCmp(prototype.id + '-cmbNEGOC').getValue() || '';
        me.bean.IN_SCARCOD = Ext.getCmp(prototype.id + '-cmbCARDTYPE').getValue() || '';
        me.bean.IN_STATUS = Ext.getCmp(prototype.id + '-cmbSTATUS').getValue() || '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.DuplicateSettlementsForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lst: me.lst
            }
        }).show();
    },
    btnSearch_click: function(obj, e) {
        console.log(me.panelActual,"actual")
        if (me.panelActual == "-panelGridData") {
            console.log(1)
             this.setFormatParameter();
             this.setGridData();    
        } else {
            console.log(2)
             this.setFormatParameterDelete();
             this.setGridDataDelete();
        }
        
        
       
    },
    setGridDataDelete: function () {
        me.beanDelete = {};
        me.lstSettlement = [];
        win.lblUser_toolTip("Estructura: MPF060");
        me.panelActual = '-panelGridDataDeleted';
        console.log(searchParams,me.beanDelete,me.lstSettlement, 'PARAMETROSSS');
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDelete'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            console.log(data);
                            var pag = Ext.getCmp(prototype.id + '-paggin');
                            var pagData = pag.getPageData();

                            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                            Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridMainDataDelete').bindStore(storeGridDatas);
             Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    setGridData: function () {
        me.beanDelete = {};
        me.lstSettlement = [];
        win.lblUser_toolTip("Estructura: MPF060");
        me.panelActual = '-panelGridData';
        console.log(searchParams,me.beanDelete,me.lstSettlement, 'PARAMETROSSS');
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            console.log(data);
                            var pag = Ext.getCmp(prototype.id + '-paggin');
                            var pagData = pag.getPageData();

                            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                            Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
             Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            //me.setWidthPie();

            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('01');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('01');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbVISTA').setValue('D');
        Ext.getCmp(prototype.id + '-cmbFUENTE').setValue('ACCB');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

    },
    btnExcel_click: function (obj, e) {

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function () {

        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
        }

    },
    onDownloadFile: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                var resultByte = res.bytes;
                var bytes = new Uint8Array(resultByte); // pass your byte response to this constructor
                var blob = new Blob([bytes], {type: "application/png"});// change resultByte to bytes

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = me.fileName;
                link.click();
            }
        });

    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-Filters');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-panelPie').setWidth(ancho);
    },
    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        var month = this.fecha.getMonth() + 1;
        if (month < 9) {
            obj.setValue('0' + month);
        } else {
            obj.setValue((month));
        }
    },
    markSettlement: function (column, rowIndex, checked, record) {
        let settlement = record.data;

        // Validación: solo permitir marcar si STVAL === 3
        if (checked && parseInt(settlement.STVAL, 10) !== 3) {
            Ext.Msg.alert("Aviso", "Solo se pueden seleccionar registros con STVAL = 3");
            record.set('checkActive', false);
            return;
        }


        if (checked) {
            // Verificar duplicado
            let exists = me.lstSettlement.some(item =>
                item.CCUST     === settlement.CCUST &&
                item.SDATE     === settlement.SDATE &&
                item.SCOUNTRY  === settlement.SCOUNTRY &&
                item.TDOC      === settlement.TDOC &&
                item.CODEBANK  === settlement.CODEBANK &&
                item.SCARCOD   === settlement.SCARCOD &&
                item.SCARDN    === settlement.SCARDN &&
                item.SAUTHOC   === settlement.SAUTHOC &&
                item.SEQ       === settlement.SEQ &&
                item.SVFOP     === settlement.SVFOP
            );

            if (!exists) {
                me.lstSettlement.push({
                    CCUST     : settlement.CCUST,
                    SDATE     : settlement.SDATE,    
                    SCOUNTRY  : settlement.SCOUNTRY, 
                    TDOC      : settlement.TDOC,     
                    CODEBANK  : settlement.CODEBANK, 
                    SCARCOD   : settlement.SCARCOD,  
                    SCARDN    : settlement.SCARDN,   
                    SAUTHOC   : settlement.SAUTHOC,  
                    SEQ       : settlement.SEQ, 
                    SVFOP     : settlement.SVFOP
                });
            }
        } else {
            // Si se desmarca, filtrar lista
            me.lstSettlement = me.lstSettlement.filter(item => !(
                item.CCUST     === settlement.CCUST &&
                item.SDATE     === settlement.SDATE &&
                item.SCOUNTRY  === settlement.SCOUNTRY &&
                item.TDOC      === settlement.TDOC &&
                item.CODEBANK  === settlement.CODEBANK &&
                item.SCARCOD   === settlement.SCARCOD &&
                item.SCARDN    === settlement.SCARDN &&
                item.SAUTHOC   === settlement.SAUTHOC &&
                item.SEQ       === settlement.SEQ &&
                item.SVFOP     === settlement.SVFOP
            ));
        }

        console.log(me.lstSettlement, 'LLENADO');
    },
    markSettlementReverse: function (column, rowIndex, checked, record) {
        let settlement = record.data;

        if (checked) {
            // Verificar duplicado
            let exists = me.lstSettlement.some(item =>
                item.CCUST     === "999" &&
                item.SDATE     === settlement.SDATE &&
                item.SCOUNTRY  === settlement.SCOUNTRY &&
                item.TDOC      === settlement.TDOC &&
                item.CODEBANK  === settlement.CODEBANK &&
                item.SCARCOD   === settlement.SCARCOD &&
                item.SCARDN    === settlement.SCARDN &&
                item.SAUTHOC   === settlement.SAUTHOC &&
                item.SEQ       === settlement.SEQ &&
                item.SVFOP     === settlement.SVFOP
            );

            if (!exists) {
                me.lstSettlement.push({
                    CCUST     : "999",
                    SDATE     : settlement.SDATE,    
                    SCOUNTRY  : settlement.SCOUNTRY, 
                    TDOC      : settlement.TDOC,     
                    CODEBANK  : settlement.CODEBANK, 
                    SCARCOD   : settlement.SCARCOD,  
                    SCARDN    : settlement.SCARDN,   
                    SAUTHOC   : settlement.SAUTHOC,  
                    SEQ       : settlement.SEQ, 
                    SVFOP     : settlement.SVFOP
                });
            }
        } else {
            // Si se desmarca, filtrar lista
            me.lstSettlement = me.lstSettlement.filter(item => !(
                item.CCUST     === "999" &&
                item.SDATE     === settlement.SDATE &&
                item.SCOUNTRY  === settlement.SCOUNTRY &&
                item.TDOC      === settlement.TDOC &&
                item.CODEBANK  === settlement.CODEBANK &&
                item.SCARCOD   === settlement.SCARCOD &&
                item.SCARDN    === settlement.SCARDN &&
                item.SAUTHOC   === settlement.SAUTHOC &&
                item.SEQ       === settlement.SEQ &&
                item.SVFOP     === settlement.SVFOP
            ));
        }

        console.log(me.lstSettlement, 'LLENADO');
    },
    deleteAllSettlements: function() {
        me.beanDelete = {};
        
        me.beanDelete.IN_FECHA_FROM = 
            (Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue() || '');

        me.beanDelete.IN_FECHA_TO = 
            (Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() || '');
    
        me.beanDelete.IN_MASSIVE = 'Y'; 
        me.beanDelete.IN_CCUST = Ext.getCmp(prototype.id + '-typeClient').getValue() || '';
        me.beanDelete.IN_CODEBANK = Ext.getCmp(prototype.id + '-txtCodeBank').getValue() || '';
        me.beanDelete.IN_NEGOC = Ext.getCmp(prototype.id + '-cmbNEGOC').getValue() || '';
        me.beanDelete.IN_SCARCOD = Ext.getCmp(prototype.id + '-cmbCARDTYPE').getValue() || '';
        me.beanDelete.IN_STATUS = Ext.getCmp(prototype.id + '-cmbSTATUS').getValue() || '';
        
        let searchParamsDelete = {
            beanString: JSON.stringify(me.beanDelete),
            beanSettlements: JSON.stringify(me.lstSettlement)
        };
        
        me.sendDeleteSettlements(searchParamsDelete, function(responseData) {
            console.log(responseData)
        });
        console.log(searchParamsDelete, 'searchParamsConciliation');
        console.log('Eliminado TODO...')
    },
    deleteSettlementsSelected: function() {
         me.beanDelete = {};
        
        if (!me.lstSettlement.length) {
            global.Msg({
                msg: 'No ha seleccionado ningun registro.'
            });
            return
        }
        
        me.beanDelete.IN_FECHA_FROM = 
            (Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue() || '');

        me.beanDelete.IN_FECHA_TO = 
            (Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() || '');
    
        me.beanDelete.IN_MASSIVE = 'N'; 
        me.beanDelete.IN_CCUST = Ext.getCmp(prototype.id + '-typeClient').getValue() || '';
        me.beanDelete.IN_CODEBANK = Ext.getCmp(prototype.id + '-txtCodeBank').getValue() || '';
        me.beanDelete.IN_NEGOC = Ext.getCmp(prototype.id + '-cmbNEGOC').getValue() || '';
        me.beanDelete.IN_SCARCOD = Ext.getCmp(prototype.id + '-cmbCARDTYPE').getValue() || '';
        me.beanDelete.IN_STATUS = Ext.getCmp(prototype.id + '-cmbSTATUS').getValue() || '';
        
        let searchParamsDelete = {
            beanString: JSON.stringify(me.beanDelete),
            beanSettlements: JSON.stringify(me.lstSettlement)
        };
        
        me.sendDeleteSettlements(searchParamsDelete, function(responseData) {
            console.log(responseData)
        });
        console.log(searchParamsDelete, 'searchParamsConciliation');
        console.log('Eliminado TODO LO SELECCIONADO...')
    },
    
    reverseAllSettlements: function() {
        me.beanDelete = {};
        
        me.beanDelete.IN_FECHA_FROM = 
            (Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue() || '');

        me.beanDelete.IN_FECHA_TO = 
            (Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() || '');
    
        me.beanDelete.IN_MASSIVE = 'Y'; 
        me.beanDelete.IN_CCUST = '999';
        me.beanDelete.IN_CODEBANK = Ext.getCmp(prototype.id + '-txtCodeBank').getValue() || '';
        me.beanDelete.IN_NEGOC = Ext.getCmp(prototype.id + '-cmbNEGOC').getValue() || '';
        me.beanDelete.IN_SCARCOD = Ext.getCmp(prototype.id + '-cmbCARDTYPE').getValue() || '';
        me.beanDelete.IN_STATUS = Ext.getCmp(prototype.id + '-cmbSTATUS').getValue() || '';
        
        let searchParamsDelete = {
            beanString: JSON.stringify(me.beanDelete),
            beanSettlements: JSON.stringify(me.lstSettlement)
        };
        
        me.sendDeleteSettlements(searchParamsDelete, function(responseData) {
            console.log(responseData)
        });
        console.log(searchParamsDelete, 'searchParamsConciliation');
        console.log('Eliminado TODO LO SELECCIONADO...')
    },
    reverseSettlementsSelected: function() {
         me.beanDelete = {};
        
        if (!me.lstSettlement.length) {
            global.Msg({
                msg: 'No ha seleccionado ningun registro.'
            });
            return
        }
        
        me.beanDelete.IN_FECHA_FROM = 
            (Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue() || '');

        me.beanDelete.IN_FECHA_TO = 
            (Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() || '') +
            (Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() || '');
    
        me.beanDelete.IN_MASSIVE = 'N'; 
        me.beanDelete.IN_CCUST = '999';
        me.beanDelete.IN_CODEBANK = Ext.getCmp(prototype.id + '-txtCodeBank').getValue() || '';
        me.beanDelete.IN_NEGOC = Ext.getCmp(prototype.id + '-cmbNEGOC').getValue() || '';
        me.beanDelete.IN_SCARCOD = Ext.getCmp(prototype.id + '-cmbCARDTYPE').getValue() || '';
        me.beanDelete.IN_STATUS = Ext.getCmp(prototype.id + '-cmbSTATUS').getValue() || '';
        
        let searchParamsDelete = {
            beanString: JSON.stringify(me.beanDelete),
            beanSettlements: JSON.stringify(me.lstSettlement)
        };
        
        me.sendDeleteSettlementsReverse(searchParamsDelete, function(responseData) {
            console.log(responseData)
        });
        console.log(searchParamsDelete, 'searchParamsConciliation');
        console.log('Eliminado TODO LO SELECCIONADO...')
    },
    sendDeleteSettlementsReverse: function (params, callback) {
        Ext.Ajax.request({
            url: prototype.url + '/sendDeleteSettlementsReverse',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: params.beanString, beanSettlements: params.beanSettlements},
            beforerequest:  Ext.getCmp(prototype.id + '-panelMain').mask('Loading...'),
            success: function(response, options) {
                
                Ext.getCmp(prototype.id + '-panelMain').unmask('Loading...');
                let res = Ext.JSON.decode(response.responseText);
                console.log(res,'res')

                if (res.success) {
                    global.Msg({msg: res.result});
                    me.btnSearch_click();
                    
                } else {
                    
                    global.Msg({msg: res.result});
                    
                    callback(res); 
                }
            },
            failure: function(response, options) {
                Ext.getCmp(prototype.id + '-panelMain').unmask('Loading...');
                console.error("Error en la petición AJAX");
                global.Msg({msg: "Error al obtener datos"});
            }
        });
    },
    sendDeleteSettlements: function (params, callback) {
        Ext.Ajax.request({
            url: prototype.url + '/sendDeleteSettlements',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: params.beanString, beanSettlements: params.beanSettlements},
            beforerequest:  Ext.getCmp(prototype.id + '-panelMain').mask('Loading...'),
            success: function(response, options) {
                
                Ext.getCmp(prototype.id + '-panelMain').unmask('Loading...');
                let res = Ext.JSON.decode(response.responseText);
                console.log(res,'res')

                if (res.success) {
                    global.Msg({msg: res.result});
                    me.btnSearch_click();
                    
                } else {
                    
                    global.Msg({msg: res.result});
                    
                    callback(res); 
                }
            },
            failure: function(response, options) {
                Ext.getCmp(prototype.id + '-panelMain').unmask('Loading...');
                console.error("Error en la petición AJAX");
                global.Msg({msg: "Error al obtener datos"});
            }
        });
    },
    
    /*     
     * Funciones para la paginacion     
     */
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridDataDeleted':
                me.pagginActual = '-paggin';
                break;
        }
    },

    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },

    getInt: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    getStoreYearBank: function (ALL) {
        var startYear = 2024;
        var fecha = new Date();
        var endYear = fecha.getFullYear() + 2;
        var years = [];
        if (ALL)
            years.push(['', 'All']);
        for (var year = endYear; year >= startYear; year--) {
            years.push([year, year]);
        }
        return Ext.create('Ext.data.ArrayStore', {
            storeId: 'year',
            autoLoad: true,
            data: years,
            fields: ['code', 'name']
        });
    },
    selectComboFromMonth: function (obj) {
        console.log(obj, 'obj from month')
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
        if (obj.getValue() != '') {
            Ext.getCmp(prototype.id + '-cmbDateFromDay').setDisabled(false);

        }

    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        console.log(storeComboDataYear, 'comboToYear')
        console.log(comboToYear, 'comboToYear')
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromDay: function (obj) {
        console.log(obj, 'obj day from')
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
}
);