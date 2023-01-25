Ext.define('Ext.Praxis.controller.interline.InterlineCorrespondence.InterlineCorrespondenceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InterlineCorrespondenceController',
    me: '',
    childs: '',
    stack: [],
    bean: {},
//    _path: '',
    init: function(view) {
        me = this;
        prototype.id = 'InterlineCorrespondenceForm';
        prototype.url = CONTEXTPATH + '/InterlineCorrespondence';
        this.childs = Ext.getCmp(prototype.id + '-boxConsultas').items.items;
        this.setStoreData();
    },
    afterRender: function() {
        this.initDate();
        this.imgSearch_clickHandler();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    initDate: function() {
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        var mes = new Date().getMonth() + 1;
        if (mes < 10)
            mes = "0" + mes;
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
    },
    cbxDateFromYear_changeHandler: function() {
        this.setValue('cmbDateToYear', this.getValue("cmbDateFromYear"));
    },
    cbxDateFromMonth_changeHandler: function() {
        this.setValue('cmbDateToMonth', this.getValue("cmbDateFromMonth"));
    },
    cbxDateFromDay_changeHandler: function() {
        this.setValue('cmbDateToDay', this.getValue("cmbDateFromDay"));
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        var storeComboDataMonth = win.getStoreDays(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataMonth);
    },
    // </editor-fold>
    changeTipoFecha: function() {
        if (this.getValue("cmbFecha") === 2) {
            Ext.getCmp(prototype.id + '-cmbDateFromDay').show();
            Ext.getCmp(prototype.id + '-cmbDateToDay').show();
        } else {
            Ext.getCmp(prototype.id + '-cmbDateFromDay').hide();
            Ext.getCmp(prototype.id + '-cmbDateToDay').hide();
        }
    },
    txtCia_keyDownHandler: function(obj, e, eOpts) {
        switch (e.getKey()) {
            case 13:
                if (this.getValue("txtCia").length < 3 && this.getValue("txtCia") !== '') {
                    this.setValue('txtCia', this.fillZeros(3, this.getValue("txtCia")));
                }
                this.imgSearch_clickHandler();
                break;
        }
    },
    txtPeriod_keyDownHandler: function(obj, e, eOpts) {
        switch (e.getKey()) {
            case 13:
                if (this.getValue("txtPeriod").length === 1) {
                    this.setValue('txtPeriod', this.fillZeros(2, this.getValue("txtPeriod")));
                }
                this.imgSearch_clickHandler();
                break;
        }
    },
    gridData_act1_clickHandler: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.SearchA020(data);
    },
    viewProrate: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var nroprt = data.A020KEY;

//        this.post_to_url(CONTEXTPATH + '/Home?'
//            + 'strMod=InterCorreo&'
//            + 'nroprt=' + nroprt
//            + '#program-prorrateo-form', {}, 'post', 'ProrrateoForm');

        prototypeProgram.view = 'interline-interline-correspondence-form';
        prototypeProgram.nprog = 'PX00000183';
        prototypeProgram.title = 'Interline Correspondence';
        prototypeProgram.modulo = '';

        win.displayBwrProrrateo(this, 'InterCorreo', nroprt);
    },
    post_to_url: function(path, params, method, id) {
        method = method || "post";

        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);
        form.setAttribute("id", id);

        document.body.appendChild(form);
        form.submit();
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        this.bean.IN_TIPOFECHA = this.getValue("cmbFecha");
        this.bean.IN_FECHA_FROM = this.getValue("cmbDateFromYear") + this.getValue("cmbDateFromMonth");
        this.bean.IN_FECHA_TO = this.getValue("cmbDateToYear") + this.getValue("cmbDateToMonth");
        if (this.getValue("cmbFecha") === 2) {
            this.bean.IN_FECHA_FROM = this.bean.IN_FECHA_FROM + this.getValue("cmbDateFromDay");
            this.bean.IN_FECHA_TO = this.bean.IN_FECHA_TO + this.getValue("cmbDateToDay");
        }
        this.bean.IN_CIA = this.getValue("txtCia");
        this.bean.IN_CODOBO = this.getValue("txtPeriod");
        this.bean.IN_STATUS = this.getValue("cmbStatus");

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
        this.setValue('txtCia', '');
        this.setValue('txtPeriod', '');
        this.setValue('cmbFecha', 1);
        this.setValue('cmbStatus', '');
        this.initDate();
        this.changeTipoFecha();
    },
    imgChart_clickHandler: function() {
    },
    imgBack_clickHandler: function() {
        if (this.peek().includes("boxMainData")) {
            global.showMenu();
        }
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
                    win.lblUser_toolTip("Estructura: A020");

                    me.selectedChild('boxMainData', 'paggin');

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="SearchA020">
    SearchA020: function(bean) {
        Ext.Ajax.request({
            url: prototype.url + '/SearchA020',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getBody().mask('Loading...'),
            success: function(response, opts) {
                Ext.getBody().unmask();
                var res = Ext.JSON.decode(response.responseText);
                var objA020 = res.A020;
                if (objA020 !== undefined) {
                    var actionCode;
                    if (objA020.strDescripcion === 'Closed') {
                        actionCode = 'V';
                    } else {
                        actionCode = 'U';
                    }
                    Ext.create('Ext.Praxis.view.interline.InterlineCorrespondenceForm.DataEntry', {
                        id: 'DataEntryInterlineCorrespondenceForm',
                        params: {
                            bean: objA020,
                            actionCode: actionCode
                        }
                    }).show();
                } else {
                    global.Msg({msg: 'Data not Found'});
                }
            },
            failure: function(response, opts) {
                Ext.getBody().unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>

    exportExcel: function() {

        var beanString = JSON.stringify(this.bean);
        var strEncode = encodeURI(prototype.url + '/getXLSX?beanString=' + beanString);
        global.getFile(strEncode);
//        global.getFile(_path);
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (this.peek().includes("boxMainData")) {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (this.peek().includes("boxMainData")) {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (this.peek().includes("boxMainData")) {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (this.peek().includes("boxMainData")) {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function(boxId, pagginId, add) {
        global.selectedChild(this.childs, prototype.id + '-' + boxId);
        add = add === null || add === undefined ? true : add;
        if (add)
            this.stack.push(prototype.id + '-' + boxId);

        if (pagginId === null || pagginId === undefined || pagginId.length === 0) {
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
            Ext.getCmp(prototype.id + '-pie').hide();
        } else {
            //<editor-fold defaultstate="collapsed" desc="setPaggin">
            var pagData = Ext.getCmp(prototype.id + '-' + pagginId).getPageData();

            var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
            var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
            var total = Ext.util.Format.number(pagData.total, '0,000');

            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
            Ext.getCmp(prototype.id + '-lbl-total').setText(total);
            //</editor-fold>
            Ext.getCmp(prototype.id + '-boxPaginacion').show();
            Ext.getCmp(prototype.id + '-pie').show();

            var width = 0, wt;
            var boxChild = Ext.getCmp(prototype.id + '-' + boxId).items.items;
            for (var i = 0; i < boxChild.length; i++) {
                if (boxChild[i].isVisible()) {
                    wt = boxChild[i].getWidth();
                    if (wt > width) {
                        width = wt;
                    }
                }
            }
            Ext.getCmp(prototype.id + '-pie').setWidth(width);
        }
    },
    peek: function() {
        return this.stack[this.stack.length - 1];
    },
    fillZeros: function(size, value) {
        for (var i = value.length; i < size; i++) {
            value = '0' + value;
        }
        return value;
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
