Ext.define('Ext.Praxis.controller.flown.AccountingCoupons.AccountingCouponsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingCouponsController',
    fecha: new Date(),
    searchParams: {},
    _path: '',
    lstPaginacion: '',
    init: function (view) {
    },
    afterRender: function () {
        this.setStoreData();
        this.btnClear_click();
        this.btnSearch_click();
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
    },
    gridData_VIEWTKT_clickHandler: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.TICKET;
        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
        beanProMasterTicket.IN_SEQ = '00';

        win.displayProMasterTicket(this, 'ViewAccountingCoupons', beanProMasterTicket);
    },
    post_to_url: function (path, params, method, id) {
        method = method || "post";

        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);
        form.setAttribute("id", id);

        document.body.appendChild(form);
        form.submit();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    setStoreData: function () {
        var storeComboDataYear = win.getStoreYear(true);
        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);

        var cmbUNIFiltro = Ext.getCmp(prototype.id + '-cmbUNIFiltro');
        cmbUNIFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["AM", "AM"],
                ["5D", "5D"]
            ]
        }));
        cmbUNIFiltro.setValue("");
        
        var cmbCIAFFiltro = Ext.getCmp(prototype.id + '-cmbCIAFFiltro');
        cmbCIAFFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["02", "02"],
                ["03", "03"]
            ]
        }));
        cmbCIAFFiltro.setValue("");
        
        var cmbFTYPEFiltro = Ext.getCmp(prototype.id + '-cmbFTYPEFiltro');
        cmbFTYPEFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["F", "FLOWN"],
                ["E", "EMD"]
            ]
        }));
        cmbFTYPEFiltro.setValue("");
        
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Export-DataEntry">
    onOpenExportClick: function (grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var FECHA = rec.data.FCONT;
        
        this.winDataEntry(FECHA);
    },
    winDataEntry: function (FECHA) {
        FECHA = FECHA === null || FECHA === undefined ? {} : FECHA;
        Ext.create('Ext.Praxis.view.flown.AccountingCouponsForm.DataEntry', {
            id: 'DataEntryAccountingCouponsForm',
            params: {
                FECHA: FECHA
            }
        }).show();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    onViewDetailFTEClick: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.setFormatParameterDetailFTE(data);
        // <editor-fold defaultstate="collapsed" desc="preparar">
        Ext.getCmp(prototype.id + '-boxMainData').hide();
        Ext.getCmp(prototype.id + '-boxMainDataDetailFTE').show();
        // </editor-fold>
        this.setGridDataSearchDetailFTE();
    },
    onViewDetailTKTClick: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var dataIndex = Ext.getCmp(prototype.id + '-gridMainDataDetailFTE').headerCt.getGridColumns()[column].dataIndex
        var strTipo = '';
        if (dataIndex === 'QTYCOUPD')
            strTipo = 'L';
        this.setFormatParameterDetailTKT(data, strTipo);
        // <editor-fold defaultstate="collapsed" desc="preparar">
        Ext.getCmp(prototype.id + '-boxMainDataDetailFTE').hide();
        Ext.getCmp(prototype.id + '-boxDetTKT').show();
        Ext.getCmp(prototype.id + '-gridDetTKT').show();
        Ext.getCmp(prototype.id + '-gridDetTKT2').hide();
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        // </editor-fold>
        this.setGridDataSearchDetailTKT();
    },
    // </editor-fold>
    cmbTranType_changeHandler: function (e, eOpts) {
        var a = Ext.getCmp(prototype.id + '-cmbCIAFFiltro').getValue();
        
        if(a === '' ){
            Ext.getCmp(prototype.id + '-lblTitMein').setText("Total Universe GAM");
        }else if(a === '02' ){
            Ext.getCmp(prototype.id + '-lblTitMein').setText("Total Universe 02");
        }else if(a === '03' ){
            Ext.getCmp(prototype.id + '-lblTitMein').setText("Total Universe 03");
        }
        this.btnSearch_click();
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-boxSearchFilter');
        if (option.isVisible())
            option.setVisible(false);
        else
            option.setVisible(true);
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
                    this.exportExcel();
                }
            }
        });
    },
    btnClear_click: function (obj, e) {
        // <editor-fold defaultstate="collapsed" desc="Clear Combo Date">
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(new Date().getFullYear());
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id + '-gridMainData').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridMainDataDetailFTE').getStore().removeAll();
        // </editor-fold>
        Ext.getCmp(prototype.id + '-boxMainDataDetailFTE').hide();
        Ext.getCmp(prototype.id + '-boxMainData').show();
    },
    btnBack_click: function () {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            global.showMenu();
        } else if (Ext.getCmp(prototype.id + '-boxMainDataDetailFTE').isVisible()) {
            Ext.getCmp(prototype.id + '-lblTitDetailFTE').setText('');
            Ext.getCmp(prototype.id + '-boxMainDataDetailFTE').hide();
            Ext.getCmp(prototype.id + '-boxMainData').show();
        } else if (Ext.getCmp(prototype.id + '-boxDetTKT').isVisible()) {
            Ext.getCmp(prototype.id + '-lblDetTituloTKT').setText('');
            Ext.getCmp(prototype.id + '-boxDetTKT').hide();
            Ext.getCmp(prototype.id + '-boxMainDataDetailFTE').show();
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function () {
        searchParams = {};
        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        var fyear = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        var CARRYER = Ext.getCmp(prototype.id + '-cmbUNIFiltro').getValue();
//        var CARRYER;
//        if(a === '' ){
//            CARRYER = '';
//        }else if(a === '1' ){
//            CARRYER = 'AM';
//        }else if(a === '2' ){
//            CARRYER = '5D';
//        }
        var CIAF = Ext.getCmp(prototype.id + '-cmbCIAFFiltro').getValue();
//        var CIAF;
//        if(b === '' ){
//            CIAF = '';
//        }else if(b === '02' ){
//            CIAF = '02';
//        }else if(b === '03' ){
//            CIAF = '03';
//        }
        var FTYPE = Ext.getCmp(prototype.id + '-cmbFTYPEFiltro').getValue();
        // </editor-fold>
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            IN_FECHA_FROM: fyear,
            CARRYER: CARRYER,
            CIAF: CIAF,
            FTYPE: FTYPE,
        };

        _path = prototype.url + '/getXLSX?' +
                'IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM;
        // </editor-fold>
    },
    setFormatParameterDetailFTE: function (data) {
        searchParams = {};
        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="llenarData">
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            IN_FECHA_FROM: data.IN_FECHA_FROM,
            QUARTER: data.QUARTER,
            FTE: data.FTE
        };

//        _path = prototype.url+'/getXLSX?' +
//                'IN_TKT='+searchParams.IN_TKT+'&' +
//                'IN_FECHA_FROM='+searchParams.IN_FECHA_FROM+'&' +
//                'IN_FECHA_TO='+searchParams.IN_FECHA_TO+'&' +
//                'IN_STVAL='+searchParams.IN_STVAL+'&' +
//                'IN_FVAL='+searchParams.IN_FVAL+'&' +
//                'IN_CARR='+searchParams.IN_CARR;
        // </editor-fold>
    },
    setFormatParameterDetailTKT: function (data, strTipo) {
        searchParams = {};
        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="llenarData">
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            strTicket: data.strTicket,
            strTipo: strTipo,
            YEAR: data.IN_FECHA_FROM,
            QUARTER: data.QUARTER,
            FTE: data.FTE,
            strFCON: data.strFCON,
            strQuarter: data.strQuarter,
            strFte: data.strFte,
            PrimerstrTicket: data.PrimerstrTicket,
            PAGNUM: '-1',
            PAGROW: '-1',
            RN: '0',
            strPag: ''
        };

//        _path = prototype.url+'/getXLSX?' +
//                'IN_TKT='+searchParams.IN_TKT+'&' +
//                'IN_FECHA_FROM='+searchParams.IN_FECHA_FROM+'&' +
//                'IN_FECHA_TO='+searchParams.IN_FECHA_TO+'&' +
//                'IN_STVAL='+searchParams.IN_STVAL+'&' +
//                'IN_FVAL='+searchParams.IN_FVAL+'&' +
//                'IN_CARR='+searchParams.IN_CARR;
        // </editor-fold>
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function () {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.AccountingCoupons.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A3085");
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
    },
    setGridDataSearchDetailFTE: function () {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.AccountingCoupons.GridDataDetailFTE', {
            proxy: {
                url: prototype.url + '/searchDetailFTE'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A3085");
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-lblTitDetailFTE').setText(
                                'Year :' + data.IN_FECHA_FROM + '  -  ' +
                                'Quarter : ' + data.strQuarter
                                );
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridMainDataDetailFTE').bindStore(storeGridDatas);
    },
    setGridDataSearchDetailTKT: function () {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.AccountingCoupons.GridDataDetailTKT', {
            proxy: {
                url: prototype.url + '/searchDetailTKT'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A3084B");
                    lstPaginacion = obj.data.items;
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-lblDetTituloTKT').setText(
                                'Date : ' + data.YEAR + '  -  ' +
                                'Quarter : ' + data.strQuarter + '  -  ' +
                                'Source : ' + data.strFte + '  -  ' +
                                'Currency : ' + data.strFCON
                                );
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDetTKT').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetTKT2').bindStore(storeGridDatas);
    },
    // </editor-fold>

    exportExcel: function () {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            global.getFile(_path);
        }
    },
    onValidarChange: function () {
        var list = Ext.getCmp(prototype.id + '-txtTKT').getValue().replace(/\s/g, "").split("");
        var txtTicket = '';
        for (var i = 0; i < list.length; i++) {
            if (this.esNumero(list[i])) {
                txtTicket += list[i];
            }
        }
        Ext.getCmp(prototype.id + '-txtTKT').setValue(txtTicket.substring(0, 13));
    },
    esNumero: function (valor) {
        return valor.toLowerCase() === valor.toUpperCase();
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagPrevious: function (obj, e) {
        var flagPag = true;
        if (Ext.getCmp(prototype.id + '-boxDetTKT').isVisible()) {
            searchParams.PAGNUM = 2;
            searchParams.PAGROW = 20;
            if (lstPaginacion.length > 0) {
                var beanTemp = lstPaginacion[0].data;
                if (beanTemp.RN >= 19) {//Primera Pagina
                    searchParams.strPag = 'Y';
                    searchParams.RN = beanTemp.RN;
                    searchParams.strTicket = beanTemp.TICKET;
                }
                if (searchParams.RN === '1') {
                    flagPag = false;
                }
                if (flagPag) {
                    this.setGridDataSearchDetailTKT();
                }
            }
        }
    },
    pagNext: function (obj, e) {
        var flagPag = true;
        if (Ext.getCmp(prototype.id + '-boxDetTKT').isVisible()) {
            searchParams.PAGNUM = 3;
            searchParams.PAGROW = 20;
            if (lstPaginacion.length > 0) {
                if (lstPaginacion.length === 19 || lstPaginacion.length === 20) {
                    searchParams.strPag = 'N';
                    var beanTemp = lstPaginacion[lstPaginacion.length - 1].data;
                    searchParams.RN = beanTemp.RN;
                    searchParams.strTicket = beanTemp.TICKET;
                }
                if (searchParams.PAGNUM === '4') {
                    flagPag = false;
                }
                if (flagPag) {
                    this.setGridDataSearchDetailTKT();
                }
            }
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});
