const handleRes = (res, options = {}) => {
	let status

	if (res.code == -1) {
		UIkit.notify({
		    message : '系统错误 code: ' + res.code,
		    status  : 'danger',
		    timeout : 1500,
		})
		status = false
	}
	else if (res.code == 1) {
		UIkit.notify({
		    message : options.errorMsg || res.msg || ('操作失败 code: ' + res.code),
		    status  : 'warning',
		    timeout : 1500,
		})
		status = false
	} else {
		UIkit.notify({
		    message : options.successMsg || res.msg || '操作成功',
		    status  : 'success',
		    timeout : 1500,
		})
		status = true
	}

	return status
}


export { handleRes }