Ext.define('Ext.Praxis.controller.salesaudit.SalesAuditReport.SalesAuditReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesAuditReportController',
    childs: '',
    stack: [],
    bean: {},
//    _path: '',
    init: function(view) {
        this.childs = Ext.getCmp(prototype.id + '-boxConsultas').items.items;
    },
    afterRender: function () {
        var sequence = '00';
	var cia = '139';
        this.setValue('txtSeq', sequence);
        this.setValue('txtCia', cia);
    },
    //<editor-fold defaultstate="collapsed" desc="Change">
    cmbOpcion_changeHandler: function () {
        var selectedValue = win.getValue("cmbOpcion");
        switch (selectedValue) {
            case "1":
                Ext.getCmp(prototype.id + '-boxFilter01').show();
                Ext.getCmp(prototype.id + '-txtCia').show();
                Ext.getCmp(prototype.id + '-txtFrmaSerie').show();
                Ext.getCmp(prototype.id + '-txtSeq').show();
                
                Ext.getCmp(prototype.id + '-boxFilter02').hide();
                Ext.getCmp(prototype.id + '-cmbOpcionSource').hide();
                
                Ext.getCmp(prototype.id + '-boxFilter03').hide();
                
                this.setValue('cmbOpcionSource', "");
                this.setValue('txtCanal', "");
                this.setValue('txtFilterDateFrom', "");
                this.setValue('txtFilterDateTO', "");
                this.setValue('txtIATA', "");
                this.setValue('txtIT', "");
                this.setValue('txtTRNCU', "");
                this.setValue('txtFBasis', "");
                this.setValue('txtCodReason', "");
                this.setValue('cmbOpcionMemo', "");
                this.setValue('cmbOpcionAudit', "0");
                this.setValue('cmbOpcionStatus', "");
                this.setValue('cmbOpcionDocumentType', "");
                this.setValue('txtPais', "");
                break;
            case "2":
                this.setValue('txtFrmaSerie', '');
                Ext.getCmp(prototype.id + '-boxFilter02').show();
                Ext.getCmp(prototype.id + '-cmbOpcionSource').show();
                
                Ext.getCmp(prototype.id + '-boxFilter03').show();
                
                Ext.getCmp(prototype.id + '-boxFilter01').hide();
                Ext.getCmp(prototype.id + '-txtCia').hide();
                Ext.getCmp(prototype.id + '-txtFrmaSerie').hide();
                Ext.getCmp(prototype.id + '-txtSeq').hide();
                break;
            case "3":
                Ext.getCmp(prototype.id + '-lblIATA').show();
                Ext.getCmp(prototype.id + '-txtIATA').show();
                Ext.getCmp(prototype.id + '-lblIT').show();
                Ext.getCmp(prototype.id + '-txtIT').show();
                Ext.getCmp(prototype.id + '-lblFBasis').show();
                Ext.getCmp(prototype.id + '-txtFBasis').show();
                Ext.getCmp(prototype.id + '-lblCodReason').show();
                Ext.getCmp(prototype.id + '-txtCodReason').show();
                Ext.getCmp(prototype.id + '-lblMemo').show();
                Ext.getCmp(prototype.id + '-cmbOpcionMemo').show();
                Ext.getCmp(prototype.id + '-lblAudit').show();
                Ext.getCmp(prototype.id + '-cmbOpcionAudit').show();
                Ext.getCmp(prototype.id + '-lblStatus').show();
                Ext.getCmp(prototype.id + '-cmbOpcionStatus').show();
                
                Ext.getCmp(prototype.id + '-boxFilter01').hide();
                Ext.getCmp(prototype.id + '-txtCia').hide();
                Ext.getCmp(prototype.id + '-txtFrmaSerie').hide();
                Ext.getCmp(prototype.id + '-txtSeq').hide();
                
                Ext.getCmp(prototype.id + '-boxFilter02').hide();
                Ext.getCmp(prototype.id + '-cmbOpcionSource').hide();
                Ext.getCmp(prototype.id + '-lblCanal').hide();
                Ext.getCmp(prototype.id + '-txtCanal').hide();
                
                this.focus("txtIATA");
                break;
            case "4":
                this.setValue('txtFrmaSerie', "");
                Ext.getCmp(prototype.id + '-boxFilter02').show();
                Ext.getCmp(prototype.id + '-cmbOpcionSource').show();
                Ext.getCmp(prototype.id + '-boxFilter03').show();
                
                Ext.getCmp(prototype.id + '-boxFilter01').hide();
                Ext.getCmp(prototype.id + '-txtCia').hide();
                Ext.getCmp(prototype.id + '-txtFrmaSerie').hide();
                Ext.getCmp(prototype.id + '-txtSeq').hide();
                break;
        }
    },
    cmbOpcion_changeHandlerSource: function () {
        var selectedValue = win.getValue("cmbOpcionSource");
        Ext.getCmp(prototype.id + '-lblCanal').hide();
        Ext.getCmp(prototype.id + '-txtCanal').hide();
        switch (selectedValue) {
            case 'ASR':
                Ext.getCmp(prototype.id + '-lblCanal').show();
                Ext.getCmp(prototype.id + '-txtCanal').show();
                break;
        }
    },
    //</editor-fold>
    
    searchPopup: function (grid, rowIndex, colIndex) {
        var data = grid.getStore().getAt(rowIndex).data;
        var DataEntryDetail = Ext.create('Ext.Praxis.view.salesaudit.SalesAuditReportForm.DataEntryDetail', { id: 'DataEntryDetailSalesAuditReportForm' });
        var controller = DataEntryDetail.getController();
        controller.CCUST = data.A1672CCUST;
	controller.CIA =  data.A1672CIA;
	controller.FORMA =  data.A1672FORMA;
	controller.SERIE= data.A1672SERIE;
	controller.SEQ=data.A1672SEQ;
        
	controller.CUPON= data.A1672CUPON;
	controller.TRNCU=data.A1672TRNCU; 
        
	controller.FUENTE=data.A1672FUENT;
	controller.AGENT=data.A1672AGENT;
	controller.TYPE="2";
        
        DataEntryDetail.show();
    },
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        var selectedOpcion = win.getValue("cmbOpcion");
        if(selectedOpcion==='') {
            global.Msg({msg: 'SELECT SEARCH BY'});
            return ;
        }
        switch (selectedOpcion) {
            case "0":
                global.Msg({msg: 'ENTER THE REQUIRED FIELDS'});
                return ;
                break;
            case "1":
                if (win.getValue("txtCia")==='' && win.getValue("txtFrmaSerie")==='') {
                    global.Msg({msg: 'Enter CIA, Forma and Serie'});
                    return ;
                } else if (win.getValue("txtCia")==='') {
                    global.Msg({msg: 'Enter Cia'});
                    return ;
                } else if (win.getValue("txtFrmaSerie")==='') {
                    global.Msg({msg: 'Enter Forma and Serie'});
                    return ;
                }
                break;
            case "4":
                var txtFilterDateFrom = Ext.util.Format.date(win.getValue('txtFilterDateFrom'), 'd/m/Y');
                var txtFilterDateTO = Ext.util.Format.date(win.getValue('txtFilterDateTO'), 'd/m/Y');
                if (txtFilterDateFrom!=='') {
                    if (txtFilterDateTO==='') {
                        global.Msg({msg: 'Enter Date To'});
                        return ;
                    }
                }
                if (txtFilterDateFrom!=='') {
                    if (txtFilterDateFrom==='') {
                        global.Msg({msg: 'Enter Date From'});
                        return ;
                    }
                }
                if (txtFilterDateFrom!=='' && txtFilterDateTO!=='') {
                    txtFilterDateFrom = new Date(txtFilterDateFrom);
                    txtFilterDateTO = new Date(txtFilterDateTO);
                    if (txtFilterDateFrom > txtFilterDateTO) {
                        global.Msg({msg: 'the starting date must be less than the end date'});
                        return ;
                    }
                }
                break;
        }
        this.bean.VP_FILTER=parseInt(selectedOpcion);
        this.bean.VP_CIA = win.getValue("txtCia").trim();
        this.bean.VP_FRMSRIE = win.getValue("txtFrmaSerie").trim();
        this.bean.VP_SEQ = win.getValue("txtSeq").trim();

        this.bean.VP_SOURCE = win.getValue("cmbOpcionSource");
        this.bean.VP_DATEFROM = Ext.util.Format.date(win.getValue('txtFilterDateFrom'), 'Ymd');
        this.bean.VP_DATETO = Ext.util.Format.date(win.getValue('txtFilterDateTO'), 'Ymd');
        this.bean.VP_CANAL = win.getValue("txtCanal");
        this.bean.VP_TRNCU= win.getValue("txtTRNCU");

        this.bean.VP_IATA = win.getValue("txtIATA").trim();
        //this.bean.VP_ISSUEDATE2 = app.trim(txtFilterIssueDate.text);
        this.bean.VP_IT = win.getValue("txtIT").trim();
        this.bean.VP_FBASIS = win.getValue("txtFBasis").trim();
        this.bean.VP_CODREASON = win.getValue("txtCodReason").trim();
        this.bean.VP_TYMEMO = win.getValue("cmbOpcionMemo");
        this.bean.VP_AUDIT = win.getValue("cmbOpcionAudit");
        this.bean.VP_STATUS = win.getValue("cmbOpcionStatus");
        this.bean.VP_TDOC = win.getValue("cmbOpcionDocumentType");
        this.bean.VP_PAIS = win.getValue("txtPais");
		
        this.search(this.bean);
    },
    imgFilter_clickHandler: function() {
        var option = Ext.getCmp(prototype.id+'-boxSearchFilter');
        if (option.isVisible()) option.hide();
        else option.show();
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
        this.setValue('txtCia', '139');
        this.setValue('txtFrmaSerie', '');
        this.setValue('txtSeq', '00');
        this.setValue('txtCanal', '');
        this.setValue('txtIATA', '');
        this.setValue('txtIT', '');
        this.setValue('txtFBasis', '');
        this.setValue('txtCodReason', '');
        
//        lstProvisosRep.removeAll();
    },
    imgBack_clickHandler: function() {
        global.showMenu();
    },
    // </editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.salesAudit.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    win.lblUser_toolTip("Estructura: A1672");
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (success) {
                        me.selectedChild('boxMainData', 'paggin', false);
                        
                        if (obj.data.length === 0) {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridcontabilidad').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    exportExcel: function() {
//        global.getFile(_path);
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin').moveFirst();
    },
    pagPrevious: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin').movePrevious();
    },
    pagNext: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin').moveNext();
    },
    pagLast: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin').moveLast();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function (boxId, pagginId, add) {
        global.selectedChild(this.childs, prototype.id + '-' + boxId);
        add = add === null || add === undefined ? true : add;
        if(add) this.stack.push(prototype.id + '-' + boxId);
        
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
                wt = boxChild[i].getWidth();
                if (wt > width) {
                    width = wt;
                }
            }
            Ext.getCmp(prototype.id + '-pie').setWidth(width);
        }
    },
    peek: function () {
        return this.stack[this.stack.length - 1];
    },
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.imgSearch_clickHandler();
        }
    }
    // </editor-fold>
});
