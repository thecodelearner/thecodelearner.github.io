"use strict";

/**
 * Configs
 */
var configs = (function () {
	var instance;
	var Singleton = function (options) {
		var options = options || Singleton.defaultOptions;
		for (var key in Singleton.defaultOptions) {
			this[key] = options[key] || Singleton.defaultOptions[key];
		}
	};
	Singleton.defaultOptions = {
		general_help: "Below there's a list of commands that you can use.\nYou can use autocomplete by pressing the TAB key",
		ls_help: "List information about the files and folders in directory.",
		cat_help: "Read FILE(s) content and print it to the standard output (screen).",
		whoami_help: "Print the details of the current effective user ID and more info.",
		date_help: "Print the system date and time.",
		help_help: "Print this menu.",
		clear_help: "Clear the terminal screen.",
		reboot_help: "Reboot the system.",
		cd_help: "Change the current working directory.",
		mv_help: "Move (rename) files.",
		rm_help: "Remove files or directories.",
		rmdir_help: "Remove directory, this command will only work if the folders are empty.",
		touch_help: "Change file timestamps. If the file doesn't exist, it's created an empty one.",
		sudo_help: "Execute a command as the superuser.",
		biosfood_help: "0xB105F00D",
		welcome: "\nWelcome to biosfood! ✌ \nMy name is Sahil Sanghavi, I'm a software engineer 👨‍💻 and a javascript developer.\nCurrently, I am pursuing a Bachelor's degree in Computer Engineering at the University of Pune. I like working with NodeJS.\n\nTo get started, feel free to either execute the 'help' command or use the more user-friendly colored sidenav to your left.\nTo skip text rolling animations, double-click/touch anywhere.\n\nIf you want to view my resume, type 'cat resume'",
		internet_explorer_warning: "NOTE: I see you're using internet explorer, this website won't work properly.",
		welcome_file_name: "welcome_message.txt",
		invalid_command_message: "<value>: command not found.",
		reboot_message: "Preparing to reboot...\n\n3...\n\n2...\n\n1...\n\nRebooting...\n\n",
		permission_denied_message: "Unable to '<value>', permission denied.",
		sudo_message: "Unable to sudo using a web client.",
		usage: "Usage",
		file: "file",
		file_not_found: "File '<value>' not found.",
		username: "Username",
		hostname: "Host",
		platform: "Platform",
		accesible_cores: "Accessible cores",
		language: "Language",
		value_token: "<value>",
		host: "biosfood.me",
		user: "ninja",
		is_root: false,
		type_delay: 1
	};
	return {
		getInstance: function (options) {
			instance === void 0 && (instance = new Singleton(options));
			return instance;
		}
	};
})();

/**
 * Your files here
 */
var files = (function () {
	var instance;
	var Singleton = function (options) {
		var options = options || Singleton.defaultOptions;
		for (var key in Singleton.defaultOptions) {
			this[key] = options[key] || Singleton.defaultOptions[key];
		}
	};
	Singleton.defaultOptions = {

		"about": "\nWhen I was just 12, I found out about computers and immediately there ignited a spark, a keen interest of the functioning of a computer inside me. This interest built-up over time to fuel my extreme interests in programming, and I started experimenting on my own over it.\n\nSince then, I have always been intrigued to keep developing something using electronics/computers and have developed quite some useful stuff (which will be out on my portfolio soon).\n\nI plan to keep innovating more with the aid of artificial intelligence, micro-computing and cloud technologies.",

		"interests": "\nMy interests include:\n- Algorithms, Backtracking and debugging.\n- ReactJS, MySQL, MongoDB, Firebase. (FERN/MERN Stack)\n- Linux, bash/shell scripting.\n- Agile app development.\n- Micro processor/controller programming (RPi / Arduino / NodeMCU)\n- Reverse Engineering software or hardware devices.\n\nOther than Technical know-how, I also take interest in:\n- Stand-up Comedy.\n- Making short films (Video film editing).\n- Any other funny stuff. \n\ndevelopment guide: clean code, always.\n",

		"academic_Info": "\n2018 - 2021, Pune University, Bachelor's degree in Computer Engineering\nMain subjects:\n- Advanced Programming\n- Artificial Intelligence\n- Cloud Computing\n- Internet of Things\n- Databases (NoSQL)\n\n2015 - 2018, Mumbai University, Diploma in Computer Engineering\nMain subjects:\n- Software Engineering\n- Software Quality Assurance/Testing\n- Object Oriented Programming\n- Mobile Computing\n- Databases (SQL)\n- Operating Systems\n- Computer Networks\n",

		"linkedin": "https://www.linkedin.com/in/sahilsanghavi/",
		"github": "https://github.com/thecodelearner/",
		"instagram": "https://instagram.com/zeductio/",
		"contact": "biosfood@protonmail.com",
		"resume": "https://sahil-cvportfolio.web.app/sahil-resume-2020.pdf"
	};
	return {
		getInstance: function (options) {
			instance === void 0 && (instance = new Singleton(options));
			return instance;
		}
	};
})();

var main = (function () {

	/**
	 * Aux functions
	 */
	var isUsingIE = window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);

	var ignoreEvent = function (event) {
		event.preventDefault();
		event.stopPropagation();
	};

	var scrollToBottom = function () {
		window.scrollTo(0, document.body.scrollHeight);
	};

	var isURL = function (str) {
		return (str.startsWith("http") || str.startsWith("www")) && str.indexOf(" ") === -1 && str.indexOf("\n") === -1;
	};

	/**
	 * Model
	 */
	var InvalidArgumentException = function (message) {
		this.message = message;
		// Use V8's native method if available, otherwise fallback
		if ("captureStackTrace" in Error) {
			Error.captureStackTrace(this, InvalidArgumentException);
		} else {
			this.stack = (new Error()).stack;
		}
	};
	// Extends Error
	InvalidArgumentException.prototype = Object.create(Error.prototype);
	InvalidArgumentException.prototype.name = "InvalidArgumentException";
	InvalidArgumentException.prototype.constructor = InvalidArgumentException;

	var cmds = {
		LS: { value: "ls", help: configs.getInstance().ls_help },
		CAT: { value: "cat", help: configs.getInstance().cat_help },
		WHOAMI: { value: "whoami", help: configs.getInstance().whoami_help },
		DATE: { value: "date", help: configs.getInstance().date_help },
		BIOSFOOD: { value: "biosfood", help: configs.getInstance().biosfood_help },
		HELP: { value: "help", help: configs.getInstance().help_help },
		CLEAR: { value: "clear", help: configs.getInstance().clear_help },
		REBOOT: { value: "reboot", help: configs.getInstance().reboot_help },
		CD: { value: "cd", help: configs.getInstance().cd_help },
		MV: { value: "mv", help: configs.getInstance().mv_help },
		RM: { value: "rm", help: configs.getInstance().rm_help },
		RMDIR: { value: "rmdir", help: configs.getInstance().rmdir_help },
		TOUCH: { value: "touch", help: configs.getInstance().touch_help },
		SUDO: { value: "sudo", help: configs.getInstance().sudo_help }
	};

	var Terminal = function (prompt, cmdLine, output, sidenav, profilePic, user, host, root, outputTimer) {
		if (!(prompt instanceof Node) || prompt.nodeName.toUpperCase() !== "DIV") {
			throw new InvalidArgumentException("Invalid value " + prompt + " for argument 'prompt'.");
		}
		if (!(cmdLine instanceof Node) || cmdLine.nodeName.toUpperCase() !== "INPUT") {
			throw new InvalidArgumentException("Invalid value " + cmdLine + " for argument 'cmdLine'.");
		}
		if (!(output instanceof Node) || output.nodeName.toUpperCase() !== "DIV") {
			throw new InvalidArgumentException("Invalid value " + output + " for argument 'output'.");
		}
		if (!(sidenav instanceof Node) || sidenav.nodeName.toUpperCase() !== "DIV") {
			throw new InvalidArgumentException("Invalid value " + sidenav + " for argument 'sidenav'.");
		}
		if (!(profilePic instanceof Node) || profilePic.nodeName.toUpperCase() !== "IMG") {
			throw new InvalidArgumentException("Invalid value " + profilePic + " for argument 'profilePic'.");
		}
		(typeof user === "string" && typeof host === "string") && (this.completePrompt = user + "@" + host + " > " + (root ? "#" : "$"));
		this.profilePic = profilePic;
		this.prompt = prompt;
		this.cmdLine = cmdLine;
		this.output = output;
		this.sidenav = sidenav;
		this.sidenavOpen = false;
		this.sidenavElements = [];
		this.typeSimulator = new TypeSimulator(outputTimer, output);
	};

	Terminal.prototype.type = function (text, callback) {
		this.typeSimulator.type(text, callback);
	};

	Terminal.prototype.exec = function () {
		var command = this.cmdLine.value;
		this.cmdLine.value = "";
		this.prompt.textContent = "";
		this.output.innerHTML += "<span class=\"prompt-color\">" + this.completePrompt + "</span> " + command + "<br/>";
	};

	Terminal.prototype.init = function () {
		this.sidenav.addEventListener("click", ignoreEvent);
		this.cmdLine.disabled = true;
		this.sidenavElements.forEach(function (elem) {
			elem.disabled = true;
		});
		this.prepareSideNav();
		this.lock(); // Need to lock here since the sidenav elements were just added
		document.body.addEventListener("click", function (event) {
			if (this.sidenavOpen) {
				this.handleSidenav(event);
			}
			this.focus();
		}.bind(this));
		this.cmdLine.addEventListener("keydown", function (event) {
			if (event.which === 13 || event.keyCode === 13) {
				this.handleCmd();
				ignoreEvent(event);
			} else if (event.which === 9 || event.keyCode === 9) {
				this.handleFill();
				ignoreEvent(event);
			}
		}.bind(this));
		this.reset();
	};

	Terminal.makeElementDisappear = function (element) {
		element.style.opacity = 0;
		element.style.transform = "translateX(-300px)";
	};

	Terminal.makeElementAppear = function (element) {
		element.style.opacity = 1;
		element.style.transform = "translateX(0)";
	};

	Terminal.prototype.prepareSideNav = function () {
		var capFirst = (function () {
			return function (string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			}
		})();
		for (var file in files.getInstance()) {
			var element = document.createElement("button");
			Terminal.makeElementDisappear(element);
			element.onclick = function (file, event) {
				this.handleSidenav(event);
				this.cmdLine.value = "cat " + file + " ";
				this.handleCmd();
			}.bind(this, file);
			element.appendChild(document.createTextNode(capFirst(file.replace(/\.[^/.]+$/, "").replace(/_/g, " "))));
			this.sidenav.appendChild(element);
			this.sidenavElements.push(element);
		}
		// Shouldn't use document.getElementById but Terminal is already using loads of params
		document.getElementById("sidenavBtn").addEventListener("click", this.handleSidenav.bind(this));
	};

	Terminal.prototype.handleSidenav = function (event) {
		if (this.sidenavOpen) {
			this.profilePic.style.opacity = 0;
			this.sidenavElements.forEach(Terminal.makeElementDisappear);
			this.sidenav.style.width = "50px";
			document.getElementById("sidenavBtn").innerHTML = "&#9776;";
			this.sidenavOpen = false;
		} else {
			this.sidenav.style.width = "300px";
			this.sidenavElements.forEach(Terminal.makeElementAppear);
			document.getElementById("sidenavBtn").innerHTML = "&times;";
			this.profilePic.style.opacity = 1;
			this.sidenavOpen = true;
		}
		document.getElementById("sidenavBtn").blur();
		ignoreEvent(event);
	};

	Terminal.prototype.lock = function () {
		this.exec();
		this.cmdLine.blur();
		this.cmdLine.disabled = true;
		this.sidenavElements.forEach(function (elem) {
			elem.disabled = true;
		});
	};

	Terminal.prototype.unlock = function () {
		this.cmdLine.disabled = false;
		this.prompt.textContent = this.completePrompt;
		this.sidenavElements.forEach(function (elem) {
			elem.disabled = false;
		});
		scrollToBottom();
		this.focus();
	};

	Terminal.prototype.handleFill = function () {
		var cmdComponents = this.cmdLine.value.trim().split(" ");
		if ((cmdComponents.length <= 1) || (cmdComponents.length === 2 && cmdComponents[0] === cmds.CAT.value)) {
			this.lock();
			var possibilities = [];
			if (cmdComponents[0].toLowerCase() === cmds.CAT.value) {
				if (cmdComponents.length === 1) {
					cmdComponents[1] = "";
				}
				if (configs.getInstance().welcome_file_name.startsWith(cmdComponents[1].toLowerCase())) {
					possibilities.push(cmds.CAT.value + " " + configs.getInstance().welcome_file_name);
				}
				for (var file in files.getInstance()) {
					if (file.startsWith(cmdComponents[1].toLowerCase())) {
						possibilities.push(cmds.CAT.value + " " + file);
					}
				}
			} else {
				for (var command in cmds) {
					if (cmds[command].value.startsWith(cmdComponents[0].toLowerCase())) {
						possibilities.push(cmds[command].value);
					}
				}
			}
			if (possibilities.length === 1) {
				this.cmdLine.value = possibilities[0] + " ";
				this.unlock();
			} else if (possibilities.length > 1) {
				this.type(possibilities.join("\n"), function () {
					this.cmdLine.value = cmdComponents.join(" ");
					this.unlock();
				}.bind(this));
			} else {
				this.cmdLine.value = cmdComponents.join(" ");
				this.unlock();
			}
		}
	};

	Terminal.prototype.handleCmd = function () {
		var cmdComponents = this.cmdLine.value.trim().split(" ");
		this.lock();
		switch (cmdComponents[0]) {
			case cmds.CAT.value:
				this.cat(cmdComponents);
				break;
			case cmds.LS.value:
				this.ls();
				break;
			case cmds.WHOAMI.value:
				this.whoami();
				break;
			case cmds.DATE.value:
				this.date();
				break;
			case cmds.BIOSFOOD.value:
				this.biosfood();
				break;
			case cmds.HELP.value:
				this.help();
				break;
			case cmds.CLEAR.value:
				this.clear();
				break;
			case cmds.REBOOT.value:
				this.reboot();
				break;
			case cmds.CD.value:
			case cmds.MV.value:
			case cmds.RMDIR.value:
			case cmds.RM.value:
			case cmds.TOUCH.value:
				this.permissionDenied(cmdComponents);
				break;
			case cmds.SUDO.value:
				this.sudo();
				break;
			default:
				this.invalidCommand(cmdComponents);
				break;
		};
	};

	Terminal.prototype.cat = function (cmdComponents) {
		var result;
		if (cmdComponents.length <= 1) {
			result = configs.getInstance().usage + ": " + cmds.CAT.value + " <" + configs.getInstance().file + ">";
		} else if (!cmdComponents[1] || (!cmdComponents[1] === configs.getInstance().welcome_file_name || !files.getInstance().hasOwnProperty(cmdComponents[1]))) {
			result = configs.getInstance().file_not_found.replace(configs.getInstance().value_token, cmdComponents[1]);
		} else {
			result = cmdComponents[1] === configs.getInstance().welcome_file_name ? configs.getInstance().welcome : files.getInstance()[cmdComponents[1]];
		}
		this.type(result, this.unlock.bind(this));
	};

	Terminal.prototype.ls = function () {
		var result = ".\n..\n" + configs.getInstance().welcome_file_name + "\n";
		for (var file in files.getInstance()) {
			result += file + "\n";
		}
		this.type(result.trim(), this.unlock.bind(this));
	};

	Terminal.prototype.sudo = function () {
		this.type(configs.getInstance().sudo_message, this.unlock.bind(this));
	}

	Terminal.prototype.whoami = function (cmdComponents) {
		var result = configs.getInstance().username + ": " + configs.getInstance().user + "\n" + configs.getInstance().hostname + ": " + configs.getInstance().host + "\n" + configs.getInstance().platform + ": " + navigator.platform + "\n" + configs.getInstance().accesible_cores + ": " + navigator.hardwareConcurrency + "\n" + configs.getInstance().language + ": " + navigator.language;
		this.type(result, this.unlock.bind(this));
	};

	Terminal.prototype.date = function (cmdComponents) {
		this.type(new Date().toString(), this.unlock.bind(this));
	};


	Terminal.prototype.biosfood = function (cmdComponents) {
		var biosfood_text = "hex[0xB105F00D] or dec[2969956365] ('BIOS food') is the value of the low bytes of last four registers on ARM PrimeCell compatible components (the component_id registers), used to identify correct behaviour of a memory-mapped component.";
		this.type(biosfood_text, this.unlock.bind(this));
	};


	Terminal.prototype.help = function () {
		var result = configs.getInstance().general_help + "\n\n";
		for (var cmd in cmds) {
			result += cmds[cmd].value + " - " + cmds[cmd].help + "\n";
		}
		this.type(result.trim(), this.unlock.bind(this));
	};

	Terminal.prototype.clear = function () {
		this.output.textContent = "";
		this.prompt.textContent = "";
		this.prompt.textContent = this.completePrompt;
		this.unlock();
	};

	Terminal.prototype.reboot = function () {
		this.type(configs.getInstance().reboot_message, this.reset.bind(this));
	};

	Terminal.prototype.reset = function () {
		this.output.textContent = "";
		this.prompt.textContent = "";
		if (this.typeSimulator) {
			this.type(configs.getInstance().welcome + (isUsingIE ? "\n" + configs.getInstance().internet_explorer_warning : ""), function () {
				this.unlock();
			}.bind(this));
		}
	};

	Terminal.prototype.permissionDenied = function (cmdComponents) {
		this.type(configs.getInstance().permission_denied_message.replace(configs.getInstance().value_token, cmdComponents[0]), this.unlock.bind(this));
	};

	Terminal.prototype.invalidCommand = function (cmdComponents) {
		this.type(configs.getInstance().invalid_command_message.replace(configs.getInstance().value_token, cmdComponents[0]), this.unlock.bind(this));
	};

	Terminal.prototype.focus = function () {
		this.cmdLine.focus();
	};

	var TypeSimulator = function (timer, output) {
		var timer = parseInt(timer);
		if (timer === Number.NaN || timer < 0) {
			throw new InvalidArgumentException("Invalid value " + timer + " for argument 'timer'.");
		}
		if (!(output instanceof Node)) {
			throw new InvalidArgumentException("Invalid value " + output + " for argument 'output'.");
		}
		this.timer = timer;
		this.output = output;
	};

	TypeSimulator.prototype.type = function (text, callback) {
		if (isURL(text)) {
			window.open(text);
		}
		var i = 0;
		var output = this.output;
		var timer = this.timer;
		var skipped = false;
		var skip = function () {
			skipped = true;
		}.bind(this);
		document.addEventListener("dblclick", skip);
		(function typer() {
			if (i < text.length) {
				var char = text.charAt(i);
				var isNewLine = char === "\n";
				output.innerHTML += isNewLine ? "<br/>" : char;
				i++;
				if (!skipped) {
					setTimeout(typer, isNewLine ? timer * 2 : timer);
				} else {
					output.innerHTML += (text.substring(i).replace(new RegExp("\n", 'g'), "<br/>")) + "<br/>";
					document.removeEventListener("dblclick", skip);
					callback();
				}
			} else if (callback) {
				output.innerHTML += "<br/>";
				document.removeEventListener("dblclick", skip);
				callback();
			}
			scrollToBottom();
		})();
	};

	return {
		listener: function () {
			new Terminal(
				document.getElementById("prompt"),
				document.getElementById("cmdline"),
				document.getElementById("output"),
				document.getElementById("sidenav"),
				document.getElementById("profilePic"),
				configs.getInstance().user,
				configs.getInstance().host,
				configs.getInstance().is_root,
				configs.getInstance().type_delay
			).init();
		}
	};
})();

window.onload = main.listener;
