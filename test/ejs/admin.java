package com.pinjia.model

import com.dix.base.core.Core
import com.dix.base.common.Const
import com.dix.base.exception.NotExistsException
import com.dix.base.model.BaseModel
import com.dix.base.model.Model
import com.fasterxml.jackson.annotation.JsonProperty

@Model(tableName = "admin")
class Admin : BaseModel() {

    @get:JsonProperty("id") var id: Long = 0L
    @get:JsonProperty("username") var username: String = ""
    @get:JsonProperty("password") var password: String = ""
    @get:JsonProperty("name") var name: String = ""
    @get:JsonProperty("gender") var gender: Int = 0
    @get:JsonProperty("email") var email: String = ""
    @get:JsonProperty("data") var data: String = ""
    @get:JsonProperty("weight") var weight: Int = 0
    @get:JsonProperty("create_time") var createTime: Long = 0L
    @get:JsonProperty("update_time") var updateTime: Long = 0L
    

    override fun ID(): Long? {
        return id
    }

    override fun keys(): Array<String> {
        return arrayOf("id", "username", "password", "name", "gender", "email", "data", "weight", "create_time", "update_time")
    }

    override fun basicKeys(): Array<String> {
        return arrayOf("id", "username", "password", "name", "gender", "email", "data", "weight", "create_time", "update_time")
    }

    override fun detailKeys(): Array<String> {
        return arrayOf("id", "username", "password", "name", "gender", "email", "data", "weight", "create_time", "update_time")
    }

    override fun process(model: Any, keys: Array<String>?): Map<String, Any>? {
        val map = Core.processModel(model, keys)

        if (map != null)
        {

        }

        return map
    }

    companion object {

        fun findById(id: Long?): Admin? {
            return Core.Q().findById(Admin::class.java, id)
        }

        fun findOrFail(id: Long?): Admin {
            return findById(id) ?: throw NotExistsException()
        }

        fun getRawById(id: Long?): Map<String, Any>? {
            val data = findById(id) ?: return null
            return data.process()
        }
    }
}