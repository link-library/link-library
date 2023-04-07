package linklibrary.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import linklibrary.dto.PostDto1;
import linklibrary.dto.QPostDto1;
import linklibrary.entity.QCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;

import java.util.List;

import static linklibrary.entity.QCategory.*;
import static linklibrary.entity.QPost.*;
import static linklibrary.entity.QUser.*;

public class PostRepositoryImpl implements PostRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public PostRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }


    @Override
    public Page<PostDto1> findPostDtos(Long userId, String bookmark, String sort, String keyword, Long categoryId, Pageable pageable) {
        List<PostDto1> result = queryFactory
                .select(new QPostDto1(
                        post.id,
                        post.title,
                        post.memo,
                        post.url,
                        post.bookmark,
                        user.nickname,
                        post.updatedAt,
                        category.name
                ))
                .from(post)
                .join(post.user, user)
                .leftJoin(post.category, category) //카테고리는 null 일수도 있어서
                .where(
                        userIdEq(userId),
                        postTitleEq(keyword),
                        bookmarkEq(bookmark),
                        categoryIdEq(categoryId)
                )
                .orderBy(postOrderBy(sort))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        return new PageImpl<>(result, pageable, result.size());
    }

    private BooleanExpression categoryIdEq(Long categoryId) {
        return categoryId != null ? post.category.id.eq(categoryId) : null;
    }

    private OrderSpecifier postOrderBy(String sort) {
        if(sort.equals("byDate")) return post.createdAt.desc();
        else if(sort.equals("byTitle")) return post.title.desc();
        return null;
    }

    private BooleanExpression bookmarkEq(String bookmark) {
        if(bookmark == null) return null;
        return bookmark.equals("true") ? post.bookmark.eq(true) : post.bookmark.eq(false);
    }

    private BooleanExpression postTitleEq(String keyword) {
        return keyword.equals("") ? null : post.title.eq(keyword);
    }

    private BooleanExpression userIdEq(Long userId) {
        return userId != null ? post.user.id.eq(userId) : null;
    }
}
