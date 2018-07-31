package com.pinjia.model

import com.dix.base.core.Core
import com.dix.base.common.Const
import com.dix.base.exception.NotExistsException
import com.dix.base.model.BaseModel
import com.dix.base.model.Model
import com.fasterxml.jackson.annotation.JsonProperty

@Model(tableName = "user")
class User : BaseModel() {

    @get:JsonProperty("avatar") var avatar: String = ""
    @get:JsonProperty("city") var city: String = ""
    @get:JsonProperty("country") var country: String = ""
    @get:JsonProperty("create_time") var createTime: Long = 0L
    @get:JsonProperty("desc") var desc: String = ""
    @get:JsonProperty("email") var email: String = ""
    @get:JsonProperty("gender") var gender: Int = 0
    @get:JsonProperty("id") var id: Long = 0L
    @get:JsonProperty("identity") var identity: Int = 0
    @get:JsonProperty("last_login_time") var lastLoginTime: Long = 0L
    @get:JsonProperty("name") var name: String = ""
    @get:JsonProperty("nickname") var nickname: String = ""
    @get:JsonProperty("password") var password: String = ""
    @get:JsonProperty("phone") var phone: String = ""
    @get:JsonProperty("promote_group_id") var promoteGroupId: Long = 0L
    @get:JsonProperty("province") var province: String = ""
    @get:JsonProperty("uid") var uid: String = ""
    @get:JsonProperty("update_time") var updateTime: Long = 0L
    @get:JsonProperty("username") var username: String = ""
    @get:JsonProperty("weight") var weight: Int = 0
    

    override fun ID(): Long? {
        return id
    }

    override fun keys(): Array<String> {
        return arrayOf("avatar", "city", "country", "create_time", "desc", "email", "gender", "id", "identity", "last_login_time", "name", "nickname", "password", "phone", "promote_group_id", "province", "uid", "update_time", "username", "weight")
    }

    override fun basicKeys(): Array<String> {
        return arrayOf("avatar", "city", "country", "create_time", "desc", "email", "gender", "id", "identity", "last_login_time", "name", "nickname", "password", "phone", "promote_group_id", "province", "uid", "update_time", "username", "weight")
    }

    override fun detailKeys(): Array<String> {
        return arrayOf("avatar", "city", "country", "create_time", "desc", "email", "gender", "id", "identity", "last_login_time", "name", "nickname", "password", "phone", "promote_group_id", "province", "uid", "update_time", "username", "weight")
    }

    override fun process(model: Any, keys: Array<String>?): Map<String, Any>? {
        val map = Core.processModel(model, keys)

        if (map != null)
        {

        }

        return map
    }

    companion object {

        fun findById(id: Long): User? {
            return Core.Q().findById(User::class.java, id)
        }

        fun findOrFail(id: Long): User {
            return findById(id) ?: throw NotExistsException()
        }

        fun getRawById(id: Long): Map<String, Any>? {
            val data = findById(id) ?: return null
            return data.process()
        }
    }
}