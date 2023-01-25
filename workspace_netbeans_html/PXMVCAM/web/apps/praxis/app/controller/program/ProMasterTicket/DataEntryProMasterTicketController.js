Ext.define('Ext.Praxis.controller.program.ProMasterTicket.DataEntryProMasterTicketController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryProMasterTicketController',
    beanProMasterTicket: {},
    bean: {},
    actionCode: '',
    ticketNumber: '',
    init: function () {
    },
    afterRender: function() {
        win.setValue('1-txtTicketCia', '139');
        if(this.actionCode === ''){
            win.setValue('1-cbxSearchBy', "1");
            this.cbxSearchBy_changeHandler();
	}
    },
    startDisplay: function () {
        win.visible('1-boxSearchFilter', true);
        console.log('Entró a SELECT_BY_TKT_2');
        console.log(this.ticketNumber);
        console.log(this.actionCode);
        switch (this.actionCode) {
            case me.SELECT_BY_TKT_1:
            case me.SELECT_BY_TKT_2:
                console.log('Entró a -->> SELECT_BY_TKT_2');
                console.log(this.ticketNumber);
                win.setValue('1-cbxSearchBy', "1");
                this.cbxSearchBy_changeHandler();
                if (this.ticketNumber.length === 13) {
                    win.setValue('1-txtTicketCia', this.ticketNumber.substr(0, 3));
                    win.setValue('1-txtTicketForSer', this.ticketNumber.substr(3));
                    this.imgSearch_clickHandler();
                }
                break;
            case me.SELECT_BY_PAX:
                win.setValue('1-cbxSearchBy', "2");
                this.cbxSearchBy_changeHandler();
                break;
            case me.SELECT_BY_PNR:
                win.setValue('1-cbxSearchBy', "3");
                this.cbxSearchBy_changeHandler();
                break;
            case me.SELECT_BY_CC:
                win.setValue('1-cbxSearchBy', "4");
                this.cbxSearchBy_changeHandler();
                break;
        }
    },
    cbxSearchBy_changeHandler: function() {
        Ext.getCmp(prototype.id+'-1-pie').hide();
        Ext.getCmp(prototype.id+'-1-lblPagActual').setText('');
        win.removeAll('1-gridData');
        switch (win.getValue('1-cbxSearchBy')) {
            case '':
                Ext.getCmp(prototype.id+'-1-Box_Option01').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option02').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option03').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option04').hide();
                Ext.getCmp(prototype.id+'-1-Box_OptionDates').hide();
                win.removeAll('1-gridData');
                break;
            case '1':
                Ext.getCmp(prototype.id+'-1-Box_Option01').show();
                Ext.getCmp(prototype.id+'-1-Box_Option02').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option03').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option04').hide();
                Ext.getCmp(prototype.id+'-1-Box_OptionDates').hide();
                win.focus('1-txtTicketForSer');
                break;
            case '2':
                Ext.getCmp(prototype.id+'-1-Box_Option01').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option02').show();
                Ext.getCmp(prototype.id+'-1-Box_Option03').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option04').hide();
                Ext.getCmp(prototype.id+'-1-Box_OptionDates').show();
                Ext.getCmp(prototype.id+'-1-Box_OptionDates').setStyle('left','543px');
                win.focus('1-txtPassenger');
                break;
            case '3':
                Ext.getCmp(prototype.id+'-1-Box_Option01').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option02').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option03').show();
                Ext.getCmp(prototype.id+'-1-Box_Option04').hide();
                Ext.getCmp(prototype.id+'-1-Box_OptionDates').hide();
                win.focus('1-txtPNR');
                break;
            case '4':
                Ext.getCmp(prototype.id+'-1-Box_Option01').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option02').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option03').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option04').show();
                Ext.getCmp(prototype.id+'-1-Box_OptionDates').show();
                Ext.getCmp(prototype.id+'-1-Box_OptionDates').setStyle('left','433px');
                win.focus('1-txtNREF_P1');
                break;
            case '5':
                Ext.getCmp(prototype.id+'-1-Box_Option01').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option02').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option03').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option04').hide();
                Ext.getCmp(prototype.id+'-1-Box_OptionDates').show();
                Ext.getCmp(prototype.id+'-1-Box_OptionDates').setStyle('left','190px');
                win.focus('1-txtFromDate');
                break;
            case '6':
                Ext.getCmp(prototype.id+'-1-Box_Option01').show();
                Ext.getCmp(prototype.id+'-1-Box_Option02').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option03').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option04').hide();
                Ext.getCmp(prototype.id+'-1-Box_OptionDates').hide();
                win.focus('1-txtTicketForSer');
                break;
            default:
                Ext.getCmp(prototype.id+'-1-Box_Option01').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option02').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option03').hide();
                Ext.getCmp(prototype.id+'-1-Box_Option04').hide();
                Ext.getCmp(prototype.id+'-1-Box_OptionDates').hide();
                break;
        }
    },
    txtFilterValue_keyUpHandler: function(e) {
        switch (e.id) {
            case prototype.id+'-1-txtTicketCia':
                if (e.value.length === 3) win.focus('1-txtTicketForSer');
                break;
            case prototype.id+'-1-txtNREF_P1':
                if (e.value.length === 6) win.focus('1-txtNREF_P2');
                break;
        }
    },
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(data) {
        win.setValue('1-cmbOptionTKT', '3');
        win.setValue('1-txtA1775GSA', data.A1775GSA);
        win.setValue('1-txtA1775PAIS', data.A1775PAIS);
        win.setValue('1-txtLote2', $.trim(data.A1775LOTE));
        win.setValue('1-txtSource', data.A1775FUENT);
        win.setValue('1-txtPreFac', data.A1775FENV);
        win.setValue('1-txtPreFactura', data.A1775STAT);
        win.setValue('1-txtFacRec', data.A1775FREC);
        win.setValue('1-txtFacturaRecibida', data.A1775STRC);
        win.setValue('1-txtA1775TFRON', Ext.util.Format.number(data.A1775TFRON, '0,000.00'));
        win.setValue('1-txtA1775TFROF', Ext.util.Format.number(data.A1775TFROF, '0,000.00'));
        win.setValue('1-txtA1775ASRON', Ext.util.Format.number(data.A1775ASRON, '0,000.00'));
        win.setValue('1-txtA1775ASROF', Ext.util.Format.number(data.A1775ASROF, '0,000.00'));
        win.setValue('1-txtA1775COMON', Ext.util.Format.number(data.A1775COMON, '0,000.00'));
        win.setValue('1-txtA1775COMOF', Ext.util.Format.number(data.A1775COMOF, '0,000.00'));
        win.setValue('1-txtA1775SCGSA', Ext.util.Format.number(data.A1775SCGSA, '0,000.00'));
        win.setValue('1-txtA1775BASE', Ext.util.Format.number(data.A1775BASE, '0,000.00'));
        win.setValue('1-txtA1775TPAG', Ext.util.Format.number(data.A1775TPAG, '0,000.00'));
        win.setValue('1-txtA1775MDALC', data.A1775MDALC);

        Ext.getCmp(prototype.id+'-1-BtnAcuseFOB').disable(true);
        if (data.A1775STAT === 'PENDING') {
            Ext.getCmp(prototype.id+'-1-BtnSendMailFOB').enable(true);
        } else {
            Ext.getCmp(prototype.id+'-1-BtnSendMailFOB').disable(true);
            if ($.trim(data.A1775FACUS) === '' && data.A1775STAT !== 'PENDING') {
                Ext.getCmp(prototype.id+'-1-BtnAcuseFOB').enable(true);
            }
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        /*
        Ext.getCmp(prototype.id+'-1-pie').hide();
        Ext.getCmp(prototype.id+'-1-lblPagActual').setText('');
        this.bean.page = {};
	this.bean.page.PAGROW = 20;
	this.bean.page.PAGNUM = 0;
        this.bean.page.ROWLST = [];
        this.bean.page.ROWLST.push('');
        */
        
        this.execSearch();
    },
    imgExcel_click: function(){
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
    exportExcel: function() {
        var selectedValue = win.getValue('1-cbxSearchBy');
	if(selectedValue !== ''){
            this.bean.IN_TFILTER = parseInt(selectedValue);
            switch(this.bean.IN_TFILTER){
                case 1:
                    this.bean.IN_TEXT = win.getValue('1-txtTicketCia')+win.getValue('1-txtTicketForSer').trim();
                    break;
                case 2:
                    this.bean.IN_TEXT = win.getValue('1-txtPassenger');
                    break;
                case 3:
                    this.bean.IN_TEXT = win.getValue('1-txtPNR');
                    break;
                case 4:
                    this.bean.IN_TEXT = win.getValue('1-txtNREF_P1')+win.getValue('1-txtNREF_P2');
                    break;
                case 5:
                    this.bean.IN_TEXT = win.getValue('1-txtIATA');
                    break;
                case 6:
                    this.bean.IN_TEXT = win.getValue('1-txtTicketCia')+win.getValue('1-txtTicketForSer').trim();
                    break;
            }
            
            
            if(this.bean.IN_TEXT === null || this.bean.IN_TEXT === ""){
                return;
            }   
            
            if(win.getValue('1-txtToDate') === null && win.getValue('1-txtFromDate') !== null){
                Ext.getCmp(prototype.id+'-1-txtToDate').setValue(win.getValue('1-txtFromDate'));
                //txtToDate.text = txtFromDate.text;
            }
            else{
                if(win.getValue('1-txtFromDate') === null && win.getValue('1-txtToDate') !== null){
                    Ext.getCmp(prototype.id+'-1-txtFromDate').setValue(win.getValue('1-txtToDate'));
                    //txtFromDate.text = txtToDate.text;
                }
            }
            
            this.bean.IN_IATA = (win.getValue('1-txtIATA') || '').trim();
            this.bean.IN_CAPL = (win.getValue('1-txtCAPL') || '').trim();
            
            if(this.bean.IN_TFILTER == 5 && this.bean.IN_IATA == ''){
                alert("Please enter issue date range and IATA");
                return;
            }

            if(this.bean.IN_IATA != ''){
                if(this.bean.IN_IATA.length != 8){
                    alert("IATA number must be 8 characters");
                    return;
                }else{
                    if((win.getValue('1-txtFromDate') === null || win.getValue('1-txtToDate') === null) && this.bean.IN_TFILTER == 5){
                        alert("Please enter issue date range");
                        return;
                    }
                }
            }
            
            this.bean.IN_DATE_FROM = Ext.util.Format.date(win.getValue('1-txtFromDate'), 'Ymd');
            this.bean.IN_DATE_TO = Ext.util.Format.date(win.getValue('1-txtToDate'), 'Ymd');
            
            console.log({ BEAN_SEARCH: this.bean });
            
            this.getXLSX(this.bean);
	}
    },    
    imgClear_clickHandler: function(obj, e) {
        Ext.getCmp(prototype.id+'-1-cbxSearchBy').setValue('');
        this.cbxSearchBy_changeHandler();
        
        Ext.getCmp(prototype.id+'-1-txtTicketCia').setValue('');
        Ext.getCmp(prototype.id+'-1-txtTicketForSer').setValue('');
        Ext.getCmp(prototype.id+'-1-txtPassenger').setValue('');
        Ext.getCmp(prototype.id+'-1-txtPNR').setValue('');
        Ext.getCmp(prototype.id+'-1-txtNREF_P1').setValue('');
        Ext.getCmp(prototype.id+'-1-txtNREF_P2').setValue('');
    },
    imgBack_clickHandler: function() {
        Ext.getCmp('DataEntryProMasterTicketForm').hide();
    },
    // </editor-fold>
    
    execSearch: function() {
        var selectedValue = win.getValue('1-cbxSearchBy');
	if(selectedValue !== ''){
            this.bean.IN_TFILTER = parseInt(selectedValue);
            switch(this.bean.IN_TFILTER){
                case 1:
                    this.bean.IN_TEXT = win.getValue('1-txtTicketCia')+win.getValue('1-txtTicketForSer').trim();
                    break;
                case 2:
                    this.bean.IN_TEXT = win.getValue('1-txtPassenger');
                    break;
                case 3:
                    this.bean.IN_TEXT = win.getValue('1-txtPNR');
                    break;
                case 4:
                    this.bean.IN_TEXT = win.getValue('1-txtNREF_P1')+win.getValue('1-txtNREF_P2');
                    break;
                case 5:
                    this.bean.IN_TEXT = win.getValue('1-txtIATA');
                    break;
                case 6:
                    this.bean.IN_TEXT = win.getValue('1-txtTicketCia')+win.getValue('1-txtTicketForSer').trim();
                    break;
            }
            
            
            if(this.bean.IN_TEXT === null || this.bean.IN_TEXT === ""){
                return;
            }   
            
            if(win.getValue('1-txtToDate') === null && win.getValue('1-txtFromDate') !== null){
                Ext.getCmp(prototype.id+'-1-txtToDate').setValue(win.getValue('1-txtFromDate'));
                //txtToDate.text = txtFromDate.text;
            }
            else{
                if(win.getValue('1-txtFromDate') === null && win.getValue('1-txtToDate') !== null){
                    Ext.getCmp(prototype.id+'-1-txtFromDate').setValue(win.getValue('1-txtToDate'));
                    //txtFromDate.text = txtToDate.text;
                }
            }
            
            this.bean.IN_IATA = (win.getValue('1-txtIATA') || '').trim();
            this.bean.IN_CAPL = (win.getValue('1-txtCAPL') || '').trim();
            
            if(this.bean.IN_TFILTER == 5 && this.bean.IN_IATA == ''){
                alert("Please enter issue date range and IATA");
                return;
            }

            if(this.bean.IN_IATA != ''){
                if(this.bean.IN_IATA.length != 8){
                    alert("IATA number must be 8 characters");
                    return;
                }else{
                    if((win.getValue('1-txtFromDate') === null || win.getValue('1-txtToDate') === null) && this.bean.IN_TFILTER == 5){
                        alert("Please enter issue date range");
                        return;
                    }
                }
            }
            
            this.bean.IN_DATE_FROM = Ext.util.Format.date(win.getValue('1-txtFromDate'), 'Ymd');
            this.bean.IN_DATE_TO = Ext.util.Format.date(win.getValue('1-txtToDate'), 'Ymd');
            
            console.log({ BEAN_SEARCH: this.bean });
            
            this.search(this.bean);
	}
    },
    //<editor-fold defaultstate="collapsed" desc="XLS">
    getXLSX: function (bean) {
        console.log('_getXLSX_');
        
        var IN_TEXT_TMP = bean.IN_TEXT;
        IN_TEXT_TMP  = IN_TEXT_TMP.replaceAll("%","_");
        
        global.getFile(prototype.url + '/getXLSX?IN_TFILTER=' + bean.IN_TFILTER + '&IN_TEXT='+IN_TEXT_TMP+'&IN_IATA='+bean.IN_IATA+'&IN_DATE_FROM='+bean.IN_DATE_FROM+'&IN_DATE_TO='+bean.IN_DATE_TO+'&IN_CAPL='+bean.IN_CAPL);
        
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean) {
        console.log('_search_');
        var me01 = this;
        var storeGridDatas = Ext.create('Ext.Praxis.store.program.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    var res = Ext.JSON.decode(response._response.responseText);
                    win.lblUser_toolTip("Estructura: A720");
                    
                    if (res.success) {
                        if (obj.data.length === 0) {
                            console.log(obj.data);
                            Ext.getCmp(prototype.id+'-1-gridData').getStore().removeAll();
                                Ext.getCmp(prototype.id+'-1-pie').hide();
                                Ext.getCmp(prototype.id+'-1-lblPagActual').setText('0');
                                global.Msg({msg: win.STR_NO_DATA});
                        }
                         else if (obj.data.length > 0) {
//                            var pagData = Ext.getCmp(prototype.id+'-1-paggin').getPageData();
//                            var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//
//                            Ext.getCmp(prototype.id+'-1-lblPagActual').setText(currentPage);
                            //me01.bean.page.PAGNUM += 1;
                            //Ext.getCmp(prototype.id+'-1-lblPagActual').setText(me01.bean.page.PAGNUM);
                            //Ext.getCmp(prototype.id+'-1-pie').show();
                            
                            console.log(obj.data);
                            if (obj.data.length === 1) {
                                console.log('_obj.data.items_');
                                console.log(obj.data.items);
                                console.log(obj.data.items[0].data);
                                me01.gridData_act1_clickHandler(obj.data.items[0].data);
                            }
                        } else {
                            if (parseInt(win.getValue('1-cbxSearchBy')) === 1) {
                                console.log('_1-cbxSearchBy_');
                                me01.beanProMasterTicket = {};
                                me01.beanProMasterTicket.IN_CIA  = win.getValue('1-txtTicketCia');
                                me01.beanProMasterTicket.IN_FORMA= win.getValue('1-txtTicketForSer').substr(0, 4); 
                                me01.beanProMasterTicket.IN_SERIE= win.getValue('1-txtTicketForSer').substr(4, 6);
                                me01.beanProMasterTicket.IN_SEQ  = '00';
                                
                                me.params.actionCode = 'VIEWTICKET_FOR_BWRMASTERTICKET';
                                me.params.bean = me01.beanProMasterTicket;
                                me.startDisplay();
                                Ext.getCmp('DataEntryProMasterTicketForm').hide();
                            } else if (parseInt(win.getValue('1-cbxSearchBy')) === 6) {
                                console.log('_ACT_VIEW_BY_TKT_ADM_');
                                me01.beanProMasterTicket = {};
                                me01.beanProMasterTicket.IN_CIA  = win.getValue('1-txtTicketCia');
                                me01.beanProMasterTicket.IN_FORMA= win.getValue('1-txtTicketForSer').substr(0, 4); 
                                me01.beanProMasterTicket.IN_SERIE= win.getValue('1-txtTicketForSer').substr(4, 6);
                                me01.beanProMasterTicket.IN_SEQ  = '00';
                                
                                me.params.actionCode = 'ACT_VIEW_BY_TKT_ADM';
                                me.params.bean = me01.beanProMasterTicket;
                                //me.startDisplay();
                                //Ext.getCmp('DataEntryProMasterTicketForm').hide();
                            } else {
                                Ext.getCmp(prototype.id+'-1-gridData').getStore().removeAll();
                                Ext.getCmp(prototype.id+'-1-pie').hide();
                                Ext.getCmp(prototype.id+'-1-lblPagActual').setText('0');
                                global.Msg({msg: win.STR_NO_DATA});
                            }
                        }
                    } else global.Msg({msg: res.sesion});
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id+'-1-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-1-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    
    gridData_act1_clickHandler: function (column, e, row, column2, x) {
        var data = {};
        if (column.TICKET === undefined) {
            data = x.record.data;
        } else {
            data = column;
        }
        var strTkt = data.TICKET;
	
	this.beanProMasterTicket = {};
	this.beanProMasterTicket.IN_CIA  = strTkt.substr(0, 3);
	this.beanProMasterTicket.IN_FORMA= strTkt.substr(3, 4); 
	this.beanProMasterTicket.IN_SERIE= strTkt.substr(7, 6);
	this.beanProMasterTicket.IN_SEQ  = win.stringPad(data.A720SEQ, '0', 2);
	if (parseInt(win.getValue('1-cbxSearchBy')) === 6) {
            me.params.actionCode = 'ACT_VIEW_BY_TKT_ADM';
        }
        else
        {
            me.params.actionCode = 'VIEWTICKET_FOR_BWRMASTERTICKET';
        }
        me.params.bean = this.beanProMasterTicket;
        me.startDisplayFromBrowser();
	me.dataEntry.hide(); //Ext.getCmp('DataEntryProMasterTicketForm').hide();
    },
    onCancelClick: function(btn){
        //this.view.close();
        me.dataEntry.hide();
    },
    
    pagFirst: function(obj, e) {
        Ext.getCmp(prototype.id+'-1-paggin').moveFirst();
    },
    pagPrevious: function(obj, e) {
//        Ext.getCmp(prototype.id+'-1-paggin').movePrevious();
        if (this.bean.page.PAGNUM > 1){
            this.bean.page.PAGNUM -= 2;
            this.execSearch();
        }
    },
    pagNext: function(obj, e) {
        var length = Ext.getCmp(prototype.id+'-1-gridData').getStore().data.length;
        var beanLast = Ext.getCmp(prototype.id+'-1-gridData').getStore().data.items[length-1].data;
        if (this.bean.page.PAGNUM === this.bean.page.ROWLST.length){
            this.bean.page.ROWLST.push(beanLast.ROWKEY);
        }else{
            this.bean.page.ROWLST[this.bean.page.PAGNUM] = beanLast.ROWKEY;
        }
        this.execSearch();
    },
    pagLast: function(obj, e) {
        Ext.getCmp(prototype.id+'-1-paggin').moveLast();
    },

    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    }
});