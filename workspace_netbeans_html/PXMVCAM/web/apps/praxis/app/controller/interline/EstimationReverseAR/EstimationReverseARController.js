Ext.define('Ext.Praxis.controller.interline.EstimationReverseAR.EstimationReverseARController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EstimationReverseARController',
    me: '',
    childs: '',
    bean: {},
    lstType: new Array(),
    lstCuentasA1740: new Array(),
    tipoDownload: '',
    mensaje: '',
    mensajeResult: '',
    headerChecked: false,
    lstDownload: new Array(),
//    _path: '',
    init: function(view) {
        me = this;
        prototype.id = 'EstimationReverseARForm';
        prototype.url = CONTEXTPATH + '/EstimationReverseAR';
        prototype.widthGrid = 1380;
        this.childs = Ext.getCmp(prototype.id + '-boxConsultas').items.items;
        this.setStoreData();
    },
    afterRender: function() {
        this.setValue('cmbDateYear', '');
        this.setValue('cmbDateMonth', '');
        this.imgSearch_clickHandler();
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(true);
        Ext.getCmp(prototype.id + '-cmbDateYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateMonth').bindStore(storeComboDataMonth);
    },
    gridData_clickHandler: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        this.beanDetail = store.getAt(rowIndex).data;
        this.listarCuentasA1740('U');
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        this.bean.IN_A2111FPROC = this.getValue("cmbDateYear") + this.getValue("cmbDateMonth") + this.getValue("txtPeriodo");
        this.bean.IN_A2111FPROC = this.bean.IN_A2111FPROC === "000" ? "" : this.bean.IN_A2111FPROC;
        this.bean.IN_A2111FUENT = this.getValue("cbxSource");
        this.bean.IN_A2111SFUEN = this.getValue("txtChannel");
        this.bean.IN_A2111PSVTA = this.getValue("txtCountry");

        if (typeof obj == 'string')
            this.mensajeResult = obj;
        else
            this.mensajeResult = "";

        this.search(this.bean);
    },
    imgFilter_clickHandler: function() {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    imgExcel_clickHandler: function(obj, e) {
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
    imgClear_clickHandler: function(obj, e) {
        this.setValue('txtChannel', '');
        this.setValue('txtCountry', '');
        this.setValue('cbxSource', 'IC');
    },
    imgAdd_clickHandler: function() {
        this.listarCuentasA1740('I');
    },
    imgEstimado_clickHandler: function() {
        var lstEstimado = new Array();
        var data = Ext.getCmp(prototype.id + '-gridData').getStore().data;

        for (var i = 0; i < data.length; i++) {
            var objA2111 = data.items[i].data;
            if (objA2111.POLIZA)
                lstEstimado.push(objA2111);
        }

        if (lstEstimado.length > 0) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Estimated generate policies?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        this.Estimados(lstEstimado);
                    }
                }
            });
        } else {
            global.Msg({msg: 'No data to estimated.'});
        }
    },
    imgReversa_clickHandler: function() {
        var lstReversa = new Array();
        var gridDataSource = Ext.getCmp(prototype.id + '-gridData').getStore().data;

        for (var i = 0; i < gridDataSource.length; i++) {
            var objA2111 = gridDataSource.items[i].data;
            if (objA2111.A2111STPRO === '0' && objA2111.A2111STS0 === 'Y' && objA2111.A2111SPROC === 'C')
                lstReversa.push(objA2111);
        }
        if (lstReversa.length > 0) {
            Ext.create('Ext.Praxis.view.interline.EstimationReverseARForm.DataEntryReverse', {
                id: 'DataEntryReverseEstimationReverseARForm',
                params: {
                    actionCode: 'I',
                    listReversaGrupo: lstReversa
                }
            }).show();
        } else {
            global.Msg({msg: 'No data to reverse.'});
        }
    },
    imgBack_clickHandler: function() {
        global.showMenu();
    },
    imFavo_clickHandler: function(cmp) {
        var url = "resources/img/botones/";
        if (cmp.icon === url + "addFav2.png") {
            cmp.setIcon(url + "delFav.png");
            Ext.getCmp(prototype.id + '-imgType').setTooltip("Delete Favorite");
            global.Msg({msg: 'Menu is added to favorite'});
//            this.insertFavoriteMenu(this.bean2149);	
        } else if (cmp.icon === url + "delFav.png") {
            cmp.setIcon(url + "addFav2.png");
            Ext.getCmp(prototype.id + '-imgType').setTooltip("Add Favorite");
            global.Msg({msg: 'Menu is Remove to favorite'});
//            this.deleteFavoriteMenu(this.bean2149);
        }
    },
    // </editor-fold>

    checkAll_clickHandler: function(cmp, newValue, oldValue, event) {
        var lstNew = new Array();
        this.headerChecked = !this.headerChecked;
        var data = Ext.getCmp(prototype.id + '-gridResult').getStore().data;
        for (var i = 0; i < data.length; i++) {
            var beanALL = data.items[i].data;
            beanALL.DESCARGA = this.headerChecked;
            lstNew.push(beanALL);
        }
        Ext.getCmp(prototype.id + '-gridResult').bindStore(
                Ext.create("Ext.Praxis.store.interline.GridData", {data: lstNew})
                );
    },
    btnDownloadFiles_click: function() {
        this.lstDownload = new Array();
        var data = Ext.getCmp(prototype.id + '-gridResult').getStore().data;
        for (var i = 0; i < data.length; i++) {
            var obj = data.items[i].data;
            obj.IN_TIPO = this.tipoDownload;
            if (obj.DESCARGA)
                this.lstDownload.push(obj);
        }
        if (data.length > 0) {
            this.downloadFiles(this.lstDownload);
        } else {
            global.Msg({msg: 'Select a record.'});
        }
    },
    downloadFiles: function(lstDownload) {
        console.log(lstDownload);
    },
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function(bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A2111");
                    me.setPaggin('paggin', prototype.widthGrid);
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found'});
                    }
                    if (me.mensajeResult !== '') {
                        global.Msg({msg: me.mensajeResult});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="listarCuentasA1740">
    listarCuentasA1740: function(action) {
        Ext.Ajax.request({
            url: prototype.url + '/listarCuentasA1740',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-centerC').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-centerC').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.lstType = new Array();
                    var lstCuentas = res.lstCuentas;
                    me.lstCuentasA1740 = lstCuentas;
                    me.lstType.push([{}, 'Select']);
                    for (var i = 0; i < lstCuentas.length; i++) {
                        var dato = lstCuentas[i];
                        var objA1740Filter = {};
                        var obj = {};
                        obj.A1740TITRA = dato.A1740TITRA;
                        obj.A1740TIPO = dato.A1740TIPO;
                        obj.A1740SUBTI = dato.A1740SUBTI;
                        obj.A1740CATEG = dato.A1740CATEG;
                        obj.A1740CIA = dato.A1740CIA;
                        obj.A1740UNIDA = dato.A1740UNIDA;
                        obj.A1740CECOS = dato.A1740CECOS;
                        obj.A1740UBICA = dato.A1740UBICA;
                        obj.A1740CTA = dato.A1740CTA;
                        obj.A1740SCTA = dato.A1740SCTA;
                        obj.A1740EQUI = dato.A1740EQUI;
                        obj.A1740ICIA = dato.A1740ICIA;
                        obj.A1740CLIE = dato.A1740CLIE;
                        objA1740Filter.A1740TITU = dato.A1740TITU;
                        me.lstType.push([obj, objA1740Filter.A1740TITU]);
                    }
                    if (action === 'I')
                        me.loadGrupo(action);
                    else if (action === 'U')
                        me.loadCuentas(action, me.beanDetail);
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id + '-centerC').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="loadCuentas">
    loadCuentas: function(action, beanDetail) {
        Ext.Ajax.request({
            url: prototype.url + '/loadCuentas',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanDetail)},
            beforerequest: Ext.getCmp(prototype.id + '-centerC').mask('Loading...'),
            success: function(response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstCuentas = res.lstCuentas;
                    Ext.getCmp(prototype.id + '-centerC').unmask();
                    Ext.create('Ext.Praxis.view.interline.EstimationReverseARForm.DataEntry', {
                        id: 'DataEntryEstimationReverseARForm',
                        params: {
                            actionCode: action,
                            bean: beanDetail,
                            lstConta: lstCuentas,
                            listType: me.lstType,
                            bloqueo: beanDetail.A2111SPROC
                        }
                    }).show();
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id + '-centerC').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="loadGrupo">
    loadGrupo: function(action) {
        Ext.Ajax.request({
            url: prototype.url + '/loadGrupo',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-centerC').mask('Loading...'),
            success: function(response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstGrupo = res.lstGrupo;
                    Ext.getCmp(prototype.id + '-centerC').unmask();
                    Ext.create('Ext.Praxis.view.interline.EstimationReverseARForm.DataEntry', {
                        id: 'DataEntryEstimationReverseARForm',
                        params: {
                            actionCode: action,
                            grupo: lstGrupo[0].A2111GRUPO,
                            listType: me.lstType,
                            lstContaA1740: me.lstCuentasA1740
                        }
                    }).show();
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id + '-centerC').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Estimados">
    Estimados: function(lstEstimado) {
        Ext.Ajax.request({
            url: prototype.url + '/Estimados',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(lstEstimado)},
            beforerequest: Ext.getCmp(prototype.id + '-centerC').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-centerC').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.tipoDownload = 'E';
                    me.mensaje = res.intResult;
                    me.resultadoDownload('A2136');
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id + '-centerC').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="resultadoDownload">
    resultadoDownload: function(filter) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/resultadoDownload'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {filter: filter};
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    me.imgSearch_clickHandler(me.mensaje);
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridResult').bindStore(storeGridDatas);
    },
    //</editor-fold>

    exportExcel: function() {
        var beanString = JSON.stringify(this.bean);
        var strEncode = encodeURI(prototype.url + '/getXLSX?beanString=' + beanString);
        global.getFile(strEncode);
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function(id) {
        global.selectedChild(this.childs, prototype.id + '-' + id);
        this.stack.push(prototype.id + '-' + id);
    },
    peek: function() {
        return this.stack[this.stack.length - 1];
    },
    setPaggin: function(id, width) {
        if (id === -1) {
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
            Ext.getCmp(prototype.id + '-pie').hide();
        } else {
            var pagData = Ext.getCmp(prototype.id + '-' + id).getPageData();

            var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
            var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
            var total = Ext.util.Format.number(pagData.total, '0,000');

            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
            Ext.getCmp(prototype.id + '-lbl-total').setText(total);

            Ext.getCmp(prototype.id + '-boxPaginacion').show();
            Ext.getCmp(prototype.id + '-pie').show();
            Ext.getCmp(prototype.id + '-pie').setWidth(width);
        }
    },
    Reiniciar_Paginacion: function(obj) {
        Ext.getCmp(prototype.id + '-lbl-currentPage').setText('0');
        Ext.getCmp(prototype.id + '-lbl-pageCount').setText('0');
        Ext.getCmp(prototype.id + '-lbl-total').setText('0');

        obj.page.PAGNUM = -1;
        obj.page.PAGROW = 20;
        obj.page.TOTPAG = -1;
        obj.page.TOTROW = -1;
    },
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
            this.imgSearch_clickHandler();
        }
    }
    // </editor-fold>
});
