/**
 * @author  remicioluis
 */
win = {
    STR_NO_DATA: 'Data not found',
    DE_ACT_VIEW: 'V',
    DE_ACT_SELECT: 'S',
    VIEWTICKET_FOR_BWRMASTERTICKET: 'VIEWTICKET_FOR_BWRMASTERTICKET',
    request: [],
    modules: [],
    loaded: false,
    getModule: function (v) {
        var ms = this.modules;
        for (var i = 0, len = ms.length; i < len; i++) {
            if (ms[i].id == v) {
                return ms[i];
            }
        }
        return null;
    },
    logAccessProgram: function (nprog) {
        Ext.Ajax.request({
            url: CONTEXTPATH + '/logAccessProgram',
            params: {nprog: nprog},
            success: function (response) {
                var res = Ext.decode(response.responseText);
                var success = res.success;
                if (success) {
                    //lg(response);                
                } else
                    global.Msg({msg: res.sesion});
            }
        });
    },
    loadModuleComplete: function (success, vid) {
        if (success === true && vid) {
            this.request.push({
                id: vid
            });
        }
    },
    requestModule: function (id) {
        var ms = this.request;
        for (var i = 0, len = ms.length; i < len; i++) {
            if (id == ms[i].id)
                return true;
        }
        return false;
    },
    showModule: function (params, myFunction) {
        //Validar acceso
        console.log(params);
        var me1 = this;
        var view = params.view;
        var nprog = params.nprog;
        var title = params.title;
        var modulo = params.modulo;
        Ext.Ajax.request({
            url: CONTEXTPATH + '/validateUserProgramAccess',
            params: {nprog: nprog || ''},
            success: function (response) {
                var res = Ext.decode(response.responseText);
                var allowed = res.allowed;
                if (allowed === 'Y') {

                    var moduleName = '';
                    var nameSpace = '';

                    Ext.each(view.split('-'), function (value, index) {
                        if (index === 0)
                            moduleName = Ext.util.Format.lowercase(value);
                        else
                            nameSpace += me1.getNameSpace(value);
                    });
                    var require = 'Ext.Praxis.view.' + moduleName + '.' + nameSpace + '.' + nameSpace;
                    var contentPanel = Ext.getCmp('App-main-contenedor');

                    if (Ext.String.trim(view) !== '') {

                        console.log(require);
                        prototype.id = nameSpace;
                        prototype.url = CONTEXTPATH + '/' + nameSpace.substr(0, nameSpace.indexOf("Form"));

                        var cmps = contentPanel.items.items;
                        var flag = false;

                        for (var i = 0; i < cmps.length; i++) {
                            var id2 = cmps[i].id.substring(0, cmps[i].id.indexOf('-'));

                            if (nameSpace === id2 && !flag) {
                                me = cmps[i].getController();
                                me.params = params;
                                me.NPROG = nprog;
                                if (myFunction !== '')
                                    myFunction();

                                cmps[i].show();
                                Ext.getCmp(id_main).getController().mostrarContenedor();
                                flag = true;
                            } else {
                                cmps[i].hide();
                            }
                        }
                        if (!flag) {
                            Ext.require(require, function () {
                                var className = Ext.ClassManager.getNameByAlias('widget.' + nameSpace);
                                var ViewClass = Ext.ClassManager.get(className);
                                var cmp = new ViewClass();
                                me = cmp.getController();
                                me.params = params;
                                me.NPROG = nprog;
                                if (myFunction !== '')
                                    myFunction();

                                cmp.show();
                                Ext.getCmp(id_main).getController().mostrarContenedor();
                                contentPanel.add(cmp);
                            });
                        }
                        if (title.length > 0) {
                            var title_module = '<h2 class="label-praxis-module">' + modulo + '<br>' + title + '</h2>';
                            $('#divTitle').html(title_module);
                        }
                        if (params.nprog !== undefined) {
                            var codeProg = nprog.substring(0, 2) + nprog.substring(7, 10);
                            $('#menuProgram').html(codeProg);
                        }
                    }
                } else {
                    global.Msg({
                        msg: 'Access denied',
                        icon: 2,
                        buttons: 1,
                        fn: function (btn) {
                        }
                    });
                }
            }
        });
    },
    showProgram: function (view, params, modulo, title) {
        var me1 = this;
        var moduleName = '';
        var nameSpace = '';

        Ext.each(view.split('-'), function (value, index) {
            if (index === 0)
                moduleName = Ext.util.Format.lowercase(value);
            else
                nameSpace += me1.getNameSpace(value);
        });
        var require = 'Ext.Praxis.view.' + moduleName + '.' + nameSpace + '.' + nameSpace;
        var contentPanel = Ext.getCmp('App-main-contenedor');

        if (Ext.String.trim(view) !== '') {

            console.log(require);
            prototype.id = nameSpace;
            prototype.url = CONTEXTPATH + '/' + nameSpace.substr(0, nameSpace.indexOf("Form"));

            var cmps = contentPanel.items.items;
            var flag = false;
            for (var i = 0; i < cmps.length; i++) {
                var id2 = cmps[i].id.substring(0, cmps[i].id.indexOf('-'));
                if (nameSpace === id2 && !flag) {
                    me = cmps[i].getController();
                    me.params = params;
//                    me.NPROG = nprog;
                    me.startDisplay();

                    cmps[i].show();
                    Ext.getCmp(id_main).getController().mostrarContenedor();
                    flag = true;
                } else {
                    cmps[i].hide();
                }
            }
            if (!flag) {
                Ext.require(require, function () {
                    var className = Ext.ClassManager.getNameByAlias('widget.' + nameSpace);
                    var ViewClass = Ext.ClassManager.get(className);
                    var cmp = new ViewClass();
                    me = cmp.getController();
                    me.params = params;
//                    me.NPROG = nprog;
                    me.startDisplay();

                    cmp.show();
                    Ext.getCmp(id_main).getController().mostrarContenedor();
                    contentPanel.add(cmp);
                });
            }
            if (modulo !== undefined && title !== undefined) {
                var title_module = '<h2 class="label-praxis-module">' + modulo + '<br>' + title + '</h2>';
                $('#divTitle').html(title_module);
            }
        }
    },
    displayProMasterTicket: function (controller, action, bean) {
        optionSelect = 'PX00000040';
        var params = {};
        params.view = 'program-pro-master-ticket-form';
        params.nprog = 'PX00000040';
        params.title = 'View Ticket';
        params.modulo = '';
        params.back = controller;

        params.actionCode = action;
        params.bean = bean;

        this.showModule(params, new Function("me.startDisplay()"));
        global.clear();
    },
    displayCustomViewTicket: function (controller, action, bean) {
        optionSelect = 'PX00000614';
        var params = {};
        params.view = 'payments-view-ticket-form';
        params.nprog = 'PX00000614';
        params.title = 'View Ticket';
        params.modulo = '';
        params.back = controller;

        params.actionCode = action;
        params.bean = bean;

        this.showModule(params, new Function("me.startDisplay()"));
        global.clear();
    },
    displaySalesReportTkt: function (cia, documento, seq, use) {
        console.log('prototype.id: ' + prototype.id);
        console.log(Ext.getCmp(prototype.id + '-dataEntryTkt'));
        var data = {};
        data.A720CIA = cia;
        data.DOCUMENTO = documento;
        data.A720SEQ = seq;
        var rec = {};
        rec.data = data;
        prototype.idGr = 'DataEntryGrupo';
        prototype.idSale = 'SalesReportFormSale';
        prototype.url = CONTEXTPATH + '/SalesReport';
        /*var dataEntryTkt = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryTkt', {
         id: prototype.id+'-dataEntryTkt',
         params: {
         rec: rec, 
         mode:'POPUP'
         }
         });
         console.log(rec);
         dataEntryTkt.show();*/

        switch (use) {
            case 'EXCH':
            case 'FLWN':
                var dataEntryTkt = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryTkt', {
                    id: prototype.idGr + '-dataEntryTkt',
                    params: {
                        rec: rec,
                        mode: 'POPUP'
                    }
                });
                console.log(rec);
                dataEntryTkt.show();
                break;
            case 'RFND':
                var dataEntryRfnd = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryRfnd', {
                    id: prototype.idGr + '-dataEntryRfnd',
                    params: {
                        rec: rec,
                        mode: 'POPUP',
                        modo: 'U',
                        exchrate: 1, // Ext.getCmp(prototype.idGr + '-de-lblExchangeRate').getValue(),
                        locCurr: 'MXN' //Ext.getCmp(prototype.idGr + '-de-lblCurrency').getValue()
                    }
                });
                dataEntryRfnd.show();
                break;
            case 'ADM':
                var dataEntryAdm = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryAdm', {
                    id: prototype.idGr + '-dataEntryAdm',
                    params: {
                        rec: rec,
                        mode: 'POPUP'
                    }
                });
                dataEntryAdm.show();
                break;
            default:
                var dataEntryTkt = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryTkt', {
                    id: prototype.idGr + '-dataEntryTkt',
                    params: {
                        rec: rec,
                        mode: 'POPUP'
                    }
                });
                console.log(rec);
                dataEntryTkt.show();
                break;
        }

        global.clear();
    },
    displayScrProrrateoIxC: function (controller, data, back) {
        var params = {};
//        params.view = 'program-prorrateo-ix-c-form';
//        params.nprog = '';
//        params.title = '';
//        params.modulo = '';

//        if(back === 'PricingProrate'){
//            params.view = 'program-prorrateo-ix-c-form';
//            params.nprog = controller.NPROG;
//            params.title = 'Pricing Prorate';
//            params.modulo = '';
//        }

        params.back = controller;
        params.beanA020 = data;
        params.strBack = back;

        this.showProgram('program-prorrateo-ix-c-form', params);
        global.clear();
    },
    displayScrProrrateoIxC_2: function (controller, bean, strModulo) {
        var params = {};
//        params.view = 'program-prorrateo-ix-c-form';
        params.nprog = 'PX00000199';
        params.title = 'Invoicing Dashboard';

        params.back = controller;
        params.beanA020 = bean;
        params.strBack = strModulo;

        this.showProgram('program-prorrateo-ix-c-form', params);
        global.clear();
    },
    displayBwrProrrateo: function (controller, strModulo, nroprt) {

        var params = {};
//        params.view = 'program-prorrateo-form';
//        params.nprog = '';
//        params.title = '';
//        params.modulo = '';
        params.back = controller;

        params.strModulo = strModulo;
        params.A020KEY = nroprt;

        this.showProgram('program-prorrateo-form', params);
        global.clear();
    },
    displayProFacsimilSearch: function (controller, data, back) {
        var params = {};
//        params.view = 'program-facsimil-form';
//        params.nprog = '';
//        params.title = 'Facsimil Information';
//        params.modulo = '';
        params.back = controller;

        params.filter = data;
        params.modBack = back;
//
        this.showProgram('program-pro-facsimil-form', params, controller.params.modulo, 'Facsimil Information');
        global.clear();
    },
    backPrograma: function (controller) {

//        var params = {};
//        
//       params.view = controller.params.view;
//          if (controller.params.nprog !== undefined){
//                 params.nprog = controller.NPROG;
//                 params.title = controller.params.title;
//                 params.modulo = controller.params.modulo;
//          }
//          this.showModule(params, '');

        var params = {};

        params.view = prototypeProgram.view;
        params.nprog = prototypeProgram.nprog;
        params.title = prototypeProgram.title;
        params.modulo = prototypeProgram.modulo;

        this.showModule(params, '');

    },
    getNameSpace: function (p) {
        var retorno = Ext.String.capitalize(p);
        var siglas = [
            'ACCB', 'ACM', 'ADJ', 'ADM', 'AP', 'AR', 'ARC', 'ASR', 'ATPCO', 'AVRA', 'BINES', 'BPO', 'BSP',
            'CAT', 'CCAM', 'DOT', 'DUP', 'EMD', 'FOB', 'GSA', 'HOT', 'IATA', 'ICH', 'IS', 'IDEC', 'ISR',
            'KMS', 'MCO', 'OAL', 'OCR', 'PMI', 'PMP', 'RAM', 'RATD', 'RFND', 'RM', 'SIS', 'SPA', 'SSIM',
            'TAX', 'TNU', 'TTBS', 'UATP', 'VCR', 'VNR', 'IT'
        ];
        var index = Ext.Array.indexOf(siglas, Ext.util.Format.uppercase(p));
        if (index >= 0)
            retorno = siglas[index];
        return retorno;
    },
    validateAccess: function (info, opcion) {
        var bolRtn = false;
        switch (opcion)
        {
            case "A":
                if (info.PERMA === "Y")
                    bolRtn = true;
                break;
            case "L":
                if (info.PERML === "Y" || info.PERMC === "Y" || info.PERMM === "Y" || info.PERME === "Y")
                    bolRtn = true;
                break;
            case "C":
                if (info.PERMC === "Y")
                    bolRtn = true;
                break;
            case "M":
                if (info.PERMM === "Y")
                    bolRtn = true;
                break;
            case "E":
                if (info.PERME === "Y")
                    bolRtn = true;
                break;
            case "X":
                if (info.PERMX === "Y")
                    bolRtn = true;
                break;
        }

        return bolRtn;
    },
    getCmp: function (id) {
        return Ext.getCmp(prototype.id + '-' + id);
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    getValueDate: function (id, format) {
        format = format === undefined ? 'Ymd' : format;
        return Ext.util.Format.date(Ext.getCmp(prototype.id + '-' + id).getValue(), format);
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setText: function (id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setText(txt);
    },
    getText: function (id, txt) {
        //return Ext.getCmp(prototype.id+'-'+id).getText();
        return Ext.getCmp(prototype.id + '-' + id).text;
    },
    visible: function (id, b) {
        if (b === undefined) {
            return Ext.getCmp(prototype.id + '-' + id).isVisible();
        } else {
            if (b)
                Ext.getCmp(prototype.id + '-' + id).show();
            else if (!b)
                Ext.getCmp(prototype.id + '-' + id).hide();
        }
    },
    removeAll: function (id) {//xtype: grid,combo probados
        Ext.getCmp(prototype.id + '-' + id).getStore().removeAll();
    },
    enabled: function (id, b) {
        if (b)
            Ext.getCmp(prototype.id + '-' + id).enable(true);
        else if (!b)
            Ext.getCmp(prototype.id + '-' + id).disable(true);
    },
    selectedChild: function (padre, child) {
        var childs = Ext.getCmp(prototype.id + '-' + padre).items.items;
        child = prototype.id + '-' + child;
        for (var i = 0; i < childs.length; i++) {
            if (childs[i].id === child)
                childs[i].show();
            else
                childs[i].hide();
        }
    },
    formatLngNumber: function (value) {
        return Ext.util.Format.number(value, '0,000');
    },
    formatDblNumber: function (value) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    formatDblNumber6: function (value) {
        return Ext.util.Format.number(value, '0,000.000000');
    },
    setTitle: function (id, txt) {//xtype: grid, probados
        Ext.getCmp(prototype.id + '-' + id).setTitle(txt);
    },
    getTitle: function (id) {//xtype: grid, probados
        return Ext.getCmp(prototype.id + '-' + id).getTitle();
    },
    stringPad: function (text, pad, num, pos) {
        pos = pos === undefined ? 'left' : pos;
        var strPad;

        if (text.length < num) {
            strPad = '';
            var padLength = num - text.length;

            for (var i = 0; i < padLength; i++) {
                if (pos === 'left') {
                    strPad += pad;
                    if (i === (padLength - 1))
                        strPad += text;

                } else if (pos === 'right') {
                    if (i === 0)
                        strPad = text;
                    strPad += pad;
                }
            }
        } else {
            strPad = text;
        }

        return strPad;
    },
    getAbreviaturaMes: function (strDate) {
        if (strDate === "01") {
            return "Jan";
        } else if (strDate === "02") {
            return "Feb";
        } else if (strDate === "03") {
            return "Mar";
        } else if (strDate === "04") {
            return "Apr";
        } else if (strDate === "05") {
            return "May";
        } else if (strDate === "06") {
            return "Jun";
        } else if (strDate === "07") {
            return "Jul";
        } else if (strDate === "08") {
            return "Aug";
        } else if (strDate === "09") {
            return "Sep";
        } else if (strDate === "10") {
            return "Oct";
        } else if (strDate === "11") {
            return "Nov";
        } else if (strDate === "12") {
            return "Dec";
        } else {
            return "Error";
        }
    },
    /**
     * Función para la carga de objetos Extjs (tabs, ventanas, etc)
     * ------------------------------------------------------------
     * Para la carga optimizada modificar parámetros de configuración
     * en el archivo config.ini( app.development = false )
     * El menu de opciones se encarga de cargarlos dinámicamente
     * según el nombre del objeto javascript
     */
    show: function (param) {
        this.p = param;
        this.p.vurl = this.p.vurl == undefined ? '' : this.p.vurl;
        this.p.id_menu = this.p.id_menu == undefined ? '' : this.p.id_menu;
        this.p.options = this.p.options == undefined ? '' : this.p.options;
        var mask = this.p.mask == undefined ? '' : this.p.mask;
        var codeProg = this.p.id_menu;

        if (Ext.util.Format.trim(this.p.vurl) != '') {
            if (inicio.development == 1 || Ext.util.Format.trim(this.p.clase) == '') {

                if (this.p.vurl.split('?').length > 1) {
                    params = Ext.Object.fromQueryString(this.p.vurl.split('?')[1] + '&id_menu=' + this.p.id_menu);
                } else {
                    params = {
                        id_menu: this.p.id_menu
                    }
                }
                if (Ext.util.Format.trim(mask) == '')
                    Ext.getCmp(inicio.id + '-contenedor').mask('Please wait... ');
                else
                    Ext.getCmp(mask).mask('Please wait...');

                if (codeProg != '')
                    Ext.getCmp(inicio.id + '-contenedor').removeAll();
                Ext.get('index_web_carga').load({
                    url: this.p.vurl,
                    scripts: true,
                    mask: true,
                    method: 'POST',
                    params: params,
                    success: function (response, options) {
                        if (Ext.util.Format.trim(mask) == '')
                            Ext.getCmp(inicio.id + '-contenedor').unmask();
                        else
                            Ext.getCmp(mask).unmask();
                        if (codeProg != '') {
                            inicio.mostrarContenedor();
                        }
                    },
                    failure: function (form, action) {
                        Ext.Msg.alert("Load failed", 'The option is not available');
                    }
                });
            } else {
                var op = this.p.options;
                var vid = this.p.clase;
                this.modules.push({
                    id: vid
                });
                var m = this.getModule(vid);
                if (m) {
                    if (this.requestModule(vid)) {
                        var javascript = eval(vid);
                        javascript.init(op);
                    } else {
                        if (Ext.util.Format.trim(mask) == '')
                            Ext.getCmp(inicio.id + '-contenedor').mask('Please wait...');
                        else
                            Ext.getCmp(mask).mask('Please wait...');
                        Ext.get('index_web_carga').load({
                            url: this.p.vurl,
                            scripts: true,
                            mask: true,
                            method: 'POST',
                            params: {
                                id_menu: this.p.id_menu
                            },
                            callback: function () {
                                if (Ext.util.Format.trim(mask) == '')
                                    Ext.getCmp(inicio.id + '-contenedor').unmask();
                                else
                                    Ext.getCmp(mask).unmask();
                                win.loadModuleComplete(true, vid);
                            }
                        });
                    }
                }
            }
        } else {
            global.Msg({
                msg: 'The option is not available',
                icon: 2,
                buttons: 1,
                fn: function (btn) {

                }
            });
        }
    },
    getMonthAbbreviationMes: function (strDate) {
        var strReturn = '';
        switch (strDate) {
            case '01':
                strReturn = 'Jan';
                break;
            case '02':
                strReturn = 'Feb';
                break;
            case '03':
                strReturn = 'Mar';
                break;
            case '04':
                strReturn = 'Apr';
                break;
            case '05':
                strReturn = 'May';
                break;
            case '06':
                strReturn = 'Jun';
                break;
            case '07':
                strReturn = 'Jul';
                break;
            case '08':
                strReturn = 'Aug';
                break;
            case '09':
                strReturn = 'Sep';
                break;
            case '10':
                strReturn = 'Oct';
                break;
            case '11':
                strReturn = 'Nov';
                break;
            case '12':
                strReturn = 'Dec';
                break;
            default:
                strReturn = strDate;
        }
        return strReturn;
    },
    getMonthAbbreviation: function (strDate) {
        var strReturn = '';
        switch (strDate) {
            case 'Jan':
            case 'JAN':
                strReturn = '01';
                break;
            case 'Feb':
            case 'FEB':
                strReturn = '02';
                break;
            case 'Mar':
            case 'MAR':
                strReturn = '03';
                break;
            case 'Apr':
            case 'APR':
                strReturn = '04';
                break;
            case 'May':
            case 'MAY':
                strReturn = '05';
                break;
            case 'Jun':
            case 'JUN':
                strReturn = '06';
                break;
            case 'Jul':
            case 'JUL':
                strReturn = '07';
                break;
            case 'Aug':
            case 'AUG':
                strReturn = '08';
                break;
            case 'Sep':
            case 'SEP':
                strReturn = '09';
                break;
            case 'Oct':
            case 'OCT':
                strReturn = '10';
                break;
            case 'Nov':
            case 'NOV':
                strReturn = '11';
                break;
            case 'Dec':
            case 'DEC':
                strReturn = '12';
                break;
            default:
                strReturn = strDate;
        }
        return strReturn;
    },
    getStoreYear: function (ALL) {
        var i = 2008, fecha = new Date(), year = fecha.getFullYear() + 1, years = new Array();
        if (ALL)
            years.push(['', 'All']);
        for (; year >= i; year--)
            years.push([year, year]);
        return Ext.create('Ext.data.ArrayStore', {
            storeId: 'year',
            autoLoad: true,
            data: years,
            fields: ['code', 'name']
        });
    },
    getStoreYear2: function (ALL, inicio) {
        var i = 2008, fecha = new Date(), year = fecha.getFullYear() + 1, years = new Array();
        i = inicio;
        if (ALL)
            years.push(['', 'All']);
        for (; year >= i; year--)
            years.push([year, year]);
        return Ext.create('Ext.data.ArrayStore', {
            storeId: 'year2',
            autoLoad: true,
            data: years,
            fields: ['code', 'name']
        });

    },
    /**
     * Devuelve una fecha en formato Ymd especificando el separador.
     * @param {type} separador
     * @param {type} fecha optional parameter
     * @returns YYYY[separador]MM[separador]DD
     */
    getFechaFormat: function (separador, fecha) {
        fecha = fecha === null || fecha === undefined ? new Date() : fecha;
        separador = separador === null || separador === undefined ? "" : separador;
        var dd = fecha.getDate();
        var mm = fecha.getMonth() + 1; //January is 0!
        var yyyy = fecha.getFullYear();

        if (dd < 10)
            dd = '0' + dd;
        if (mm < 10)
            mm = '0' + mm;
        return yyyy + separador + mm + separador + dd;
    },
    getStoreMonth: function (ALL) {
        var i = 0, month = new Array();
        if (ALL)
            month.push(['', 'All']);
        month.push(
                ["01", "Jan"],
                ["02", "Feb"],
                ["03", "Mar"],
                ["04", "Apr"],
                ["05", "May"],
                ["06", "Jun"],
                ["07", "Jul"],
                ["08", "Aug"],
                ["09", "Sep"],
                ["10", "Oct"],
                ["11", "Nov"],
                ["12", "Dec"]
                );
        return Ext.create('Ext.data.ArrayStore', {
            storeId: 'filter',
            autoLoad: true,
            data: month,
            fields: ['code', 'name']
        });
    },
    setSelectedMonth: function (obj, val) {
        obj.setValue(obj.getStore().data.items[obj.getStore().data.items.length == 13 ? val + 1 : val].data[0]);
    },
    getStoreDays: function (ALL) {
        var j = 31, day = 1, days = new Array();
        if (ALL)
            days.push(['', 'All']);
        for (; day <= j; day++)
            days.push([(day < 10) ? '0' + day : day, (day < 10) ? '0' + day : day]);
        return Ext.create('Ext.data.ArrayStore', {
            storeId: 'days',
            autoLoad: true,
            data: days,
            fields: ['code', 'name']
        });
    },
    getStoreDays2: function (ALL, year, month) {
        var j = new Date(year, month + 1, 0).getDate(), days = new Array();
        if (ALL)
            days.push(['', 'All']);
        for (var day = 1; day <= j; day++)
            days.push([(day < 10) ? '0' + day : day, (day < 10) ? '0' + day : day]);
        return Ext.create('Ext.data.ArrayStore', {
            storeId: 'days2',
            autoLoad: true,
            data: days,
            fields: ['code', 'name']
        });
    },
    lblUser_toolTip: function (str) {
        $('#menuUser').prop('title', str);
    },
    setReplaceDate: function (date) {
        if (date != "") {
            var split = date.split("/"), s = "";
            for (var x = 0; x < split.length; x++)
                s = s + "" + split[x];
            return s;
        } else {
            return date;
        }
    },
    getChangeMsn: function (op) {
        switch (op) {
            case 'U':
                op = 'UPDATE RECORD?';
                break;
            case 'I':
                op = 'SAVE RECORD?';
                break;
            case 'D':
                op = 'DELETE CHANGES?';
                break;
            case 'S':
                op = 'SAVE RECORD?';
                break;
        }
        return op;
    },
    getMessage: function (strOption) {
        switch (strOption) {
            case "I":
                return "Added registry correctly";
                break;
            case "U":
                return "Modified registry correctly";
                break;
            case "D":
                return "Deleted registry correctly";
                break;
        }
        return "";
    }
}

var LarSyrExt = function () {

    this.selectedChild = function (childs, box) {
        //box = prototype.id+'-'+box;
        var b;
        for (var i = 0; i < childs.length; i++) {
            b = childs[i];
            if (b.id === box) {
                b.show();
            } else {
                b.hide();
            }
        }
    };

    this.showMenu = function (p) {
        var heightMenu = 400;
        var URLhash = window.location.hash;
        var modulo = URLhash.substring(1, URLhash.indexOf("-"));
        var idPanel = '';
        var link = '';
        switch (modulo) {
            case 'sales':
                idPanel = 'panel10';
                link = $('#menuPraxis a')[0];
                break;
            case 'flown':
                idPanel = 'panel11';
                link = $('#menuPraxis a')[1];
                break;
            case 'interline':
                idPanel = 'panel12';
                link = $('#menuPraxis a')[2];
                break;
            case 'tnu':
                idPanel = 'panel14';
                link = $('#menuPraxis a')[3];
                break;
            case 'payments':
                idPanel = 'panel15';
                link = $('#menuPraxis a')[4];
                break;
            case 'bitools':
                idPanel = 'panel16';
                link = $('#menuPraxis a')[5];
                break;
            case 'others':
                idPanel = 'panel17';
                link = $('#menuPraxis a')[6];
                break;
            case 'favorites':
                idPanel = 'panel18';
                link = $('#menuPraxis a')[7];
                break;
            case 'salesaudit':
                idPanel = 'panel21';
                link = $('#menuPraxis a')[8];
                break;
            case 'plm':
                idPanel = 'panel22';
                console.log("*");
                link = $('#menuPraxis a')[9];
                break;
                //Continuar con los demas items del menu...


        }

        $('.panel-parent').show();
        $('#menuCommands').show();
        $('#menuCommands').addClass('menuCommandRWD');
        $('.panel-menu').hide();
        $('#menuPraxis a').removeClass('menuSelected');
        $('.panel-menu').hide();
        $('#' + idPanel).show();
        $(link).addClass('menuSelected');

        Ext.getCmp('App-main' + '-region-content-north').setHeight(heightMenu);
    };
    this.clear = function (p) {
        Ext.select('#menu').setStyle({display: 'none'});
        var heightMenu = 106;
        Ext.getCmp(id_main + '-region-content-north').setHeight(heightMenu);
    };
    this.Msg = function (p) {
        var icons = [Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
        var button = [Ext.Msg.CANCEL, Ext.Msg.OK, Ext.Msg.OKCANCEL, Ext.Msg.YESNO, Ext.Msg.YESNOCANCEL];
        p.title = p.title == undefined ? '.:PRAXIS:.' : p.title;
        p.msg = p.title == undefined ? '' : p.msg;
        p.buttons = p.buttons == undefined ? 1 : p.buttons;
        p.icon = p.icon == undefined ? 1 : p.icon;
        p.fn = p.fn == undefined ? false : p.fn;
        if (p.msg === 'SESSION_CONTROL')
        {
            p.msg = 'Session Expired.';
            Ext.Msg.show({
                title: p.title,
                msg: p.msg,
                buttons: button[p.buttons],
                icon: icons[p.icon],
                fn: p.fn
            });
            var strDomain = CONTEXTPATH + '/';
            var strURL = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + strDomain;
            setTimeout(function () {
                window.location.href = strURL;
            }, 3000);
        } else
        {
            Ext.Msg.show({
                title: p.title,
                msg: p.msg,
                buttons: button[p.buttons],
                icon: icons[p.icon],
                fn: p.fn
            });
        }
    };
    this.getMonthName = function (strDate) {
        var strReturn = '';
        switch (strDate) {
            case '01':
                strReturn = 'ENERO';
                break;
            case '02':
                strReturn = 'FEBRERO';
                break;
            case '03':
                strReturn = 'MARZO';
                break;
            case '04':
                strReturn = 'ABRIL';
                break;
            case '05':
                strReturn = 'MAYO';
                break;
            case '06':
                strReturn = 'JUNIO';
                break;
            case '07':
                strReturn = 'JULIO';
                break;
            case '08':
                strReturn = 'AGOSTO';
                break;
            case '09':
                strReturn = 'SEPTIEMBRE';
                break;
            case '10':
                strReturn = 'OCTUBRE';
                break;
            case '11':
                strReturn = 'NOVIEMBRE';
                break;
            case '12':
                strReturn = 'DICIEMBRE';
                break;
            default:
                strReturn = strDate;
        }
        return strReturn;
    };
    this.getMonthAbrev = function (strDate) {
        var strReturn = '';
        switch (strDate) {
            case '01':
                strReturn = 'ENE';
                break;
            case '02':
                strReturn = 'FEB';
                break;
            case '03':
                strReturn = 'MAR';
                break;
            case '04':
                strReturn = 'ABR';
                break;
            case '05':
                strReturn = 'MAY';
                break;
            case '06':
                strReturn = 'JUN';
                break;
            case '07':
                strReturn = 'JUL';
                break;
            case '08':
                strReturn = 'AGO';
                break;
            case '09':
                strReturn = 'SEP';
                break;
            case '10':
                strReturn = 'OCT';
                break;
            case '11':
                strReturn = 'NOV';
                break;
            case '12':
                strReturn = 'DIC';
                break;
            default:
                strReturn = strDate;
        }
        return strReturn;
    };

    this.notification = function (p) {
        this.p = p;
        this.p.vtitle = this.p.vtitle == undefined ? 'Notificacion' : this.p.vtitle;
        this.p.vhtml = this.p.vhtml == undefined ? 'M&oacute;dulos Cargados' : this.p.vhtml;
        this.p.vtime = this.p.vtime == undefined ? 5000 : parseInt(this.p.vtime);
        new Ext.ux.Notification({
            title: this.p.vtitle,
            html: this.p.vhtml,
            autoDestroy: true,
            hideDelay: this.p.vtime,
            shadow: false,
            padding: 5
        }).show(Ext.getBody());
    };
    this.permisos = function (p) {
        var type = p.type == undefined ? 'btn' : p.type;
        var a = [];
        Ext.Object.each(Ext.JSON.decode(Ext.getCmp('menu-' + p.id_menu).permisos), function (index, value) {
            a.push(parseInt(value.serv_id));
        });
        if (type == 'btn') {
            var index = a.indexOf(parseInt(p.id_serv));
            if (index >= 0) {
                Ext.getCmp(p.id_btn).enable();
                Ext.getCmp(p.id_btn).resumeEvents();
            } else {
                Ext.getCmp(p.id_btn).suspendEvents();
                Ext.getCmp(p.id_btn).disable();
                if (p.fn.length > 0) {
                    for (var i = 0; i < p.fn.length; ++i)
                        eval("if (" + p.fn[i] + ") delete " + p.fn[i]);
                }
            }
        } else if (type == 'link') {
            var html = '<div class="gk-column-icon">';
            Ext.Object.each(p.icons, function (index, value) {
                var index = a.indexOf(parseInt(value.id_serv));
                var clsDisabled = 'disable_link';
                if (index >= 0) {
                    clsDisabled = '';
                    value.js = value.js != undefined && value.js != '' ? value.js : '';
                } else {
                    value.js = '';
                    value.qtip = '';
                }
                if (value.img != undefined && value.img != '')
                    html += '<img src="/images/icon/' + value.img + '" class="link ' + clsDisabled + '" data-qtip="' + value.qtip + '" onclick="' + value.js + '"/>';
                else {
                    var valor = isNaN(value.value);
                    if (!valor)
                        clsDisabled = parseFloat(value.value) == 0 ? 'disable_link' : '';
                    html += '<a href="#" class="link ' + clsDisabled + '" data-qtip="' + value.qtip + '" onclick="' + value.js + '">' + value.value + '</a>';
                }
            });
            html += '</div>';
            return html;
        }
    };
    this.state_item_menu = function (id_menu, bool) {
        Ext.getCmp('menu-' + id_menu).setDisabled(bool);
    };
    /**
     * This function it's necessary for creating sub-level
     */
    this.subtable = function (p) {
        var data = {
            columns: p.columns,
            data: p.data
        };

        var html = '<table id="' + p.id + '" class="lr-table">';
        html += '<tr class="lr-table-tr lr-table-head">';
        Ext.Object.each(data.columns, function (index, v) {
            html += '<td class="lr-table-td lr-table-td-head" style="width:' + v.width + '; text-align: ' + (!v.align ? 'left' : v.align) + ';">' + v.text + '</td>';
        });
        html += '</tr>';
        var valor = '';
        html += '<tbody>';
        Ext.Object.each(data.data, function (index, v) {
            html += '<tr class="lr-table-tr">';
            Ext.Object.each(data.columns, function (index01, a) {
                valor = v[a.dataIndex];
                valor = valor == undefined ? '' : valor;
                if (Ext.isFunction(a.renderer))
                    valor = a.renderer.call(p, valor, v);
                html += '<td class="lr-table-td" style="text-align: ' + (!a.align ? 'left' : a.align) + ';" data=\'' + Ext.JSON.encode(v) + '\'>' + valor + '</td>';
            });
            html += '</tr>';
        });
        html += '</tbody>';
        html += '</table>';

        var tpl = new Ext.XTemplate(
                '<div class="lr-div-table">',
                html,
                '</div>'
                );

        tpl.overwrite(p.renderTo, data);
    };
    this.timer = {
        seconds: 0,
        minutes: 0
    },
            this.runner = new Ext.util.TaskRunner();
    this.task = this.runner.newTask({
        scope: this,
        run: function () {
            ++this.timer.seconds;
            if (this.timer.seconds % 60 == 0) {
                ++this.timer.minutes;
                this.timer.seconds = 0;
            }
            var tiempo = Ext.util.Format.leftPad(String(this.timer.minutes), 2, '0') + ':' + Ext.util.Format.leftPad(String(this.timer.seconds), 2, '0');
            Ext.get(this.id_mask + '-cron').update(tiempo);
        },
        interval: 1000
    });
    this.mask = function (gk_id, msg) {
        var message = msg == undefined ? 'Please, wait!' : msg;
        this.id_mask = gk_id.id == undefined ? gk_id : gk_id.id;
        this.task.start();
        var html = '<div class="gk-mask">';
        html += '<div class="lbl-message">' + message + '</div>';
        html += '<div id="' + this.id_mask + '-cron' + '" class="lbl-timer">00:00</div>';
        html += '</div>';
        Ext.get(this.id_mask).el.mask(html, 'x-mask-loading');
    };
    this.unmask = function (gk_id) {
        this.id_mask = gk_id.id == undefined ? gk_id : gk_id.id;
        this.task.stop();
        this.timer.seconds = 0;
        this.timer.minutes = 0;
        Ext.get(this.id_mask).el.unmask();
    };
    this.getFile = function (_path) {
        var strDomain = _path;
        var strURL = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + strDomain;

        window.open(strURL, '_blank');
    };
    //Jim
    this.getFileJson = function (_path, json) {
        var result = '', re = '?', keys = Object.keys(json);
        keys.forEach(function (key) {
            result = result + re + key + "=" + json[key];
            re = '&';
        });
        var strURL = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + _path + result;
        window.open(strURL, '_blank');
    };
    //Jim
    this.openWindowWithPost = function (url, key, json) {

        var strURL = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + url;
        var newWindow = window.open(strURL, '');

        if (!newWindow)
            return false;

        var html = "";
        html += "<html><head></head><body><form id='formid' method='post' action='" + strURL + "'>";

        html += "<input type='hidden' name='" + key + "' value='" + json + "'/>";

        html += "</form><script type='text/javascript'>document.getElementById(\"formid\").submit()</sc" + "ript></body></html>";

        newWindow.document.write(html);
        return newWindow;
    };
    this.fillString = function (field, len) {
        if (field == null) {
            field = '';
        }
        for (var i = field.length; i < len; i++) {
            field = ' ' + field;
        }
        return field;

    };
    this.fillZero = function (field, len) {
        if (field == null) {
            field = '';
        }
        for (var i = field.length; i < len; i++) {
            field = '0' + field;
        }
        return field;

    };
    this.existeFecha = function (fecha) {
        var datePat = /^\d{4}\/\d{2}\/\d{2}$/; ///^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
        var estado = "";
        if (!datePat.test(fecha)) {
            estado = 'The Selected date is not valid!';
        }
        var fechaArr = fecha.split('/');
        var anio = fechaArr[0];
        var mes = fechaArr[1];
        var dia = fechaArr[2];

        if (dia < 1 || dia > 31) {
            estado = "The day value must be between 1 and  31!";
        }
        if (mes < 1 || mes > 12) {
            estado = "The month value must be between 1 and  12!";
        }
        if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31) {
            estado = "The month " + mes + " does not have 31 day!";
        }
        if (mes == 2) { // bisiesto
            var bisiesto = (anio % 4 == 0 && (anio % 100 != 0 || anio % 400 == 0));
            if (dia > 29 || (dia == 29 && !bisiesto)) {
                estado = "february " + anio + " does not have " + dia + " day!";
            }
        }
        return estado;
    };
    this.validate_fechaMayorQue = function (fechaInicial, fechaFinal) {
        var xMonth = fechaInicial.substring(3, 5);
        var xDay = fechaInicial.substring(0, 2);
        var xYear = fechaInicial.substring(6, 10);
        var yMonth = fechaFinal.substring(3, 5);
        var yDay = fechaFinal.substring(0, 2);
        var yYear = fechaFinal.substring(6, 10);
        if (xYear > yYear)
        {
            return true;
        } else {
            if (xYear === yYear)
            {
                if (xMonth > yMonth)
                {
                    return true;
                } else
                {
                    if (xMonth === yMonth)
                    {
                        if (xDay > yDay)
                            return true;
                        else
                            return false;
                    } else
                        return false;
                }
            } else
                return false;
        }
    };

    this.validarFechaMenorActual = function (date) {
        var estado = "";

        var today = new Date();
        var date2 = new Date(date);

        if (date2 > today)
        {
            estado = 'Date registered is greater than the current date';
        }
        return estado;
        //return true;
    };
    this.fillZeros = function (size, value) {
        value = value.padStart(size, "0");
        return value;

    };


    this.extraer_separador_fecha = function (date) {
        var dato = '';
        dato = date.replace('/', '').replace('/', '');
        return dato;

    };
    this.FechaActual = function () {
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth() + 1; //hoy es 0!
        var yyyy = hoy.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        hoy = yyyy + '/' + mm + '/' + dd;
        return hoy;
    };
    this.replaceAll = function (value, pattern, replace) {
        while (value.indexOf(pattern) > -1) {
            value = value.replace(pattern, replace);
        }
        return value;
    };


    this.getFileExcelPost = function (method, parms, columns) {

        var js_columns = JSON.stringify(columns);
        var mapForm = document.createElement("form");
        mapForm.target = "_blank";
        mapForm.method = "POST"; // or "post" if appropriate
        mapForm.action = prototype.url + '/' + method + '?dw_excel=true';
        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "beanString";
        mapInput.value = parms;
        mapForm.appendChild(mapInput);
        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "columns";
        mapInput.value = js_columns;
        mapForm.appendChild(mapInput);
        document.body.appendChild(mapForm);
        mapForm.submit();
    };

    this.AccessControlMaganer = function () {
        if (userAccess.length > 0)
        {
            /*var plusItems = document.querySelectorAll('.prx-icon-add');
             var createItems = document.querySelectorAll('-btn-save');
             var updateItems = document.querySelectorAll('.prx-icon-update');
             var editItems = document.querySelectorAll('.prx-icon-edit');
             var deleteItems = document.querySelectorAll('-btn-delete');
             var exportItems = document.querySelectorAll('.prx-icon-excel');
             console.log("updateItems");
             if(plusItems === null) plusItems = [];
             console.log(updateItems);*/
            // PERML, PERMC, PERMM, PERME, PERMX
            console.log("AccessControlMaganer");
            console.log(prototype.id);
            console.log(accessSelect);
            if (accessSelect.PERMC === 'N') {
                if (Ext.getCmp(prototype.id + '-btn-save'))
                    Ext.getCmp(prototype.id + '-btn-save').hide();
                if (Ext.getCmp(prototype.id + '-btnAdd'))
                    Ext.getCmp(prototype.id + '-btnAdd').hide();
            } else {
                if (Ext.getCmp(prototype.id + '-btn-save'))
                    Ext.getCmp(prototype.id + '-btn-save').show();
                if (Ext.getCmp(prototype.id + '-btnAdd'))
                    Ext.getCmp(prototype.id + '-btnAdd').show();
            }
            if (accessSelect.PERMM === 'N') {
                if (Ext.getCmp(prototype.id + '-btn-update'))
                    Ext.getCmp(prototype.id + '-btn-update').hide();
            } else {
                if (Ext.getCmp(prototype.id + '-btn-update'))
                    Ext.getCmp(prototype.id + '-btn-update').show();
            }
            if (accessSelect.PERME === 'N') {
                if (Ext.getCmp(prototype.id + '-btn-delete'))
                    Ext.getCmp(prototype.id + '-btn-delete').hide();
            } else {
                if (Ext.getCmp(prototype.id + '-btn-delete'))
                    Ext.getCmp(prototype.id + '-btn-delete').show();
            }
        }
    };
    this.countBy = function (array, campo) {
        return array.reduce((acumulador, objeto) => {
            // Obtener el valor del campo
            const key = objeto[campo];

            // Si la clave ya existe en el acumulador, incrementar el contador
            if (acumulador[key]) {
                acumulador[key]++;
            } else {
                // Si la clave no existe, inicializar el contador en 1
                acumulador[key] = 1;
            }

            return acumulador;
        }, {});
    };
    this.sumBy = function (array, campo) {
        return array.reduce((acumulador, objeto) => {
            return acumulador + (objeto[campo] || 0); // Evitar valores indefinidos
        }, 0);
    };
    this.sumByFilter = function (array, campo, campoFiltrado, valor) {
        return array.reduce((acumulador, objeto) => {
            return (objeto[campoFiltrado] || '') === valor ?
                    acumulador + (objeto[campo] || 0) : acumulador; // Evitar valores indefinidos
        }, 0);
    };
    this.getDistict = function (lst, key) {
        let valoresVistos = {};
        // Filtra el array para eliminar duplicados según la columna "nombre"
        let resultado = lst.filter(function (item) {
            if (valoresVistos[item[key]]) {
                // Si el valor ya se ha visto, exclúyelo
                return false;
            }
            // Si es la primera vez que se ve, márcalo como visto y manténlo en el resultado
            valoresVistos[item[key]] = true;
            return true;
        });
        return resultado;
    };
    this.setComboStore = function (cmp, data, valueField, displayField, value) {
        //crea record vacio
        let allRecord = {};
        allRecord[displayField] = 'All';
        allRecord[valueField] = '';
        //limpia record de data
        data.forEach(obj => {
            for (let attr in obj) {
                if (typeof obj[attr] === 'string') {
                    obj[attr] = obj[attr].trimEnd();
                }
            }
        });
        //crea Store
        let store = new Ext.data.Store({
            autoLoad: true,
            data: data
        });
        //inserta record vacio
        store.insert(0, allRecord);
        //renderiza Combo
        cmp.valueField = valueField;
        cmp.displayField = displayField;
        cmp.suspendEvents(false);
        cmp.bindStore(store);
        cmp.setValue(value);
        cmp.resumeEvents();
    };
    this.arrayAddUnique = function (newArray, array, keys) {
        let prev = array.length;
        let added = newArray.length;
        let newObjs = newArray.filter(obj => !array.some(x =>
                keys.every(key => obj[key] === x[key])
            ));
        array = array.concat(newObjs);

        let post = array.length;
        return {
            original: prev,
            added: added,
            inserted: (post - prev),
            duplicated: added - (post - prev),
            modified: post,
            data: array
        };
    };
    this.arrayRemove = function (removeArray, array, keys) {
        let prev = array.length;
        array = array.filter(item =>
            !removeArray.some(x =>
                keys.every(key => item[key] === x[key])
            )
        );
        let post = array.length;

        return {
            original: prev,
            removed: removeArray.length,
            modified: post,
            data: array
        };
    };
    this.filterArrayByObj = function (array, obj, equals) {
        let lst = array.filter(x => {
            return Object.keys(obj).every(key => {
                return obj[key] === '' || (
                        //variable equals
                        equals ? obj[key] === x[key].trim() :
                        obj[key] !== x[key].trim()
                        );
            });
        });
        return lst;
    };
    this.PX_UTILS_URL = 'js/praxis.ui-1.0/praxis.utils-1.0.js';
    this.downloadFile = function (objAxios, url, params, typeFile = 'zip') {
        new AWN().async(
                objAxios.post(url, params ? params : null,
                        {
                            responseType: 'blob'  // Configuración para recibir un Blob
                        }).then(response => {
            // Procesar la descarga del archivo
            const contentDisposition = response.headers['content-disposition'];
            let nombreArchivo = `file.${typeFile}`;

            if (contentDisposition) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(contentDisposition);
                if (matches !== null && matches[1]) {
                    nombreArchivo = matches[1].replace(/['"]/g, '');
                }
            }
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = nombreArchivo;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        }),
                'Sucessfully Downloaded',
                'Error on Download');
    };
    this.downloadFile2 = function (objAxios, url, params, typeFile = 'zip') {
        new AWN().async(
                objAxios.get(url,
                        {
                            params: params,
                            responseType: 'blob'  // Configuración para recibir un Blob
                        }).then(response => {
            // Procesar la descarga del archivo
            const contentDisposition = response.headers['content-disposition'];
            let nombreArchivo = `file.${typeFile}`;

            if (contentDisposition) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(contentDisposition);
                if (matches !== null && matches[1]) {
                    nombreArchivo = matches[1].replace(/['"]/g, '');
                }
            }
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = nombreArchivo;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        }),
                'Sucessfully Downloaded',
                'Error on Download');
    };
    this.cleanPXobj = function (obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key].trimEnd();
            }
        }
    };
    this.maintenanceObj = function (jsonData) {
        const resultado = {};
        for (const clave in jsonData) {
            if (jsonData.hasOwnProperty(clave)) {
                // Convierte la clave a mayúsculas y añade "IN" como prefijo
                const nuevaClave = `IN_${clave.toUpperCase()}`;

                // Asigna el valor original a la nueva clave
                resultado[nuevaClave] = jsonData[clave];
            }
        }
        return resultado;
    };
    this.callStoreGet = async function (library, store, params) {
        let response = {};
        let request = axios.create({
            baseURL: CONTEXTPATH + '/Generic',
            timeout: 0
        });
        let parameters = {
            library: library,
            procedure: store
        };
        if (params) {
            parameters.params = params;
        } else {
            parameters.params = {};
        }
        try {
            const res = await request.post('CallStoreGet', parameters);
            const {status, data} = res;
            if (status === 200) {
                response = data;
            }
        } catch (e) {
            console.error('Error on load Grid', e);
        }
        return response;
    };
    this.callStorePost = async function (library, store, params) {
        let request = axios.create({
            baseURL: CONTEXTPATH + '/Generic',
            timeout: 0
        });
        let parameters = {
            library: library,
            procedure: store,
            params: params
        };
        try {
            const res = await request.post('CallStorePost', parameters);
            return res;
        } catch (e) {
            console.error('Error on load Grid', e);
            return null;
        }
    };
    this.callStorePaggin = function (library, procedure, params) {
        let store = new Ext.data.Store({
            loadMask: true,
            pageSize: 20,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: `${CONTEXTPATH}/Generic/CallStorePaggin/${library}/${procedure}`,
                extraParams: params,
                timeout: 600000,
                reader: {
                    type: 'json',
                    rootProperty: 'response',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (store, records, successful, operation) {
                    if (!successful) {
                        global.Msg({msg: 'Data not Found'});
                    } else {
                        //console.log(records);
                        if (records.length === 0) {
                            global.Msg({msg: 'Data not Found'});
                        }
                    }
                }
            }
        });
        return store;
    };
    this.callStorePagginExcel = async function (library, procedure, params) {
        let request = axios.create({
            baseURL: CONTEXTPATH + '/Generic',
            timeout: 0
        });
        params.excel = true;
        params.start = 0;
        params.limit = -1;
        try {
            const res = await request.get(`CallStorePaggin/${library}/${procedure}`, {
                params: params
            });
            const {status, data} = res;
            if (status === 200) {
                return data.response;
            }
        } catch (e) {
            console.error('Error on load', e);
            return null;
        }
    };
    this.writeExcelFromJson = async function (data, name) {
        const ws = XLSX.utils.json_to_sheet(data);

        const headers = Object.keys(data[0]);

        //Define Headers
        const headerStyle = {
            font: {bold: true, color: {rgb: "FFFFFF"}}, // Texto blanco y negrita
            fill: {fgColor: {rgb: "FF0000"}}, // Fondo rojo
            alignment: {horizontal: "center", vertical: "center"}, // Centrado
            border: {
                top: {style: "thin", color: {rgb: "FFFFFF"}},
                bottom: {style: "thin", color: {rgb: "FFFFFF"}},
                left: {style: "thin", color: {rgb: "FFFFFF"}},
                right: {style: "thin", color: {rgb: "FFFFFF"}}
            }
        };

        // Aplicar estilos solo a los headers
        headers.forEach((_, colIndex) => {
            const cellAddress = XLSX.utils.encode_cell({r: 0, c: colIndex});
            if (!ws[cellAddress]) {
                ws[cellAddress] = {v: headers[colIndex]}; // Asegurar que la celda existe
            }
            ws[cellAddress].s = headerStyle;
        });

        // Crear libro de Excel
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "result");

        let uuid = crypto.randomUUID().replace(/-/g, '').substring(0, 6);
        // Descargar archivo
        XLSX.writeFile(wb, name + "_" + uuid + ".xlsx");
    };
};

var global = new LarSyrExt();